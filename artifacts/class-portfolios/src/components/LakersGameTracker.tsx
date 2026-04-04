import { useCallback, useEffect, useState } from 'react';

const LAKERS_TEAM_ID = '13';
const TEAM_URL =
  'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/13';
const SCOREBOARD_URL =
  'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard';

type RecordState = { wins: number; losses: number };

type LiveState = {
  lalScore: string;
  oppAbbr: string;
  oppScore: string;
  detail: string;
};

function parseRecord(data: unknown): RecordState | null {
  const team = (data as { team?: { record?: { items?: unknown[] } } })?.team;
  const items = team?.record?.items;
  if (!Array.isArray(items)) return null;
  const total = items.find(
    (i: { type?: string }) => i && typeof i === 'object' && i.type === 'total',
  ) as { summary?: string; stats?: { name: string; value: number }[] } | undefined;
  if (!total) return null;
  const stats = total.stats ?? [];
  const w = stats.find(s => s.name === 'wins')?.value;
  const l = stats.find(s => s.name === 'losses')?.value;
  if (typeof w === 'number' && typeof l === 'number') {
    return { wins: Math.round(w), losses: Math.round(l) };
  }
  if (total.summary && /^\d+-\d+$/.test(total.summary)) {
    const [a, b] = total.summary.split('-').map(Number);
    return { wins: a, losses: b };
  }
  return null;
}

function parseLakersLiveGame(data: unknown): LiveState | null {
  const events = (data as { events?: unknown[] })?.events;
  if (!Array.isArray(events)) return null;
  for (const ev of events) {
    const comp = (ev as { competitions?: unknown[] })?.competitions?.[0] as
      | {
          status?: { type?: { state?: string; detail?: string; shortDetail?: string } };
          competitors?: {
            team?: { id?: string; abbreviation?: string };
            score?: string;
          }[];
        }
      | undefined;
    if (!comp?.competitors?.length) continue;
    const state = comp.status?.type?.state;
    if (state !== 'in') continue;
    const lal = comp.competitors.find(c => c.team?.id === LAKERS_TEAM_ID);
    const opp = comp.competitors.find(c => c.team?.id !== LAKERS_TEAM_ID);
    if (!lal || !opp?.team) continue;
    const detail =
      comp.status?.type?.shortDetail ?? comp.status?.type?.detail ?? 'Live';
    return {
      lalScore: lal.score ?? '0',
      oppAbbr: opp.team.abbreviation ?? 'OPP',
      oppScore: opp.score ?? '0',
      detail,
    };
  }
  return null;
}

export default function LakersGameTracker() {
  const [record, setRecord] = useState<RecordState | null>(null);
  const [live, setLive] = useState<LiveState | null>(null);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    try {
      const [teamRes, boardRes] = await Promise.all([
        fetch(TEAM_URL),
        fetch(SCOREBOARD_URL),
      ]);
      if (!teamRes.ok || !boardRes.ok) throw new Error('bad status');
      const [teamJson, boardJson] = await Promise.all([
        teamRes.json(),
        boardRes.json(),
      ]);
      setRecord(parseRecord(teamJson));
      setLive(parseLakersLiveGame(boardJson));
      setError(false);
    } catch {
      setError(true);
    }
  }, []);

  useEffect(() => {
    void load();
    const id = setInterval(() => void load(), live ? 25_000 : 60_000);
    return () => clearInterval(id);
  }, [load, live]);

  return (
    <div className="gp-nba" role="status" aria-live="polite">
      {live && (
        <div className="gp-nba-live">
          <span className="gp-nba-live-dot" aria-hidden />
          Live
          <span className="gp-nba-score">
            LAL {live.lalScore} · {live.oppAbbr} {live.oppScore}
          </span>
          <span className="gp-nba-detail">{live.detail}</span>
        </div>
      )}
      <div className="gp-nba-record">
        {error && !record ? (
          <span className="gp-nba-muted">Season record unavailable</span>
        ) : record ? (
          <>
            <span className="gp-nba-muted">Season</span>{' '}
            <span className="gp-nba-wl">{record.wins}W</span>
            <span className="gp-nba-dot">·</span>
            <span className="gp-nba-wl">{record.losses}L</span>
          </>
        ) : (
          <span className="gp-nba-muted">Loading…</span>
        )}
      </div>
      <div className="gp-nba-source">Scores &amp; record via ESPN (unofficial)</div>
    </div>
  );
}
