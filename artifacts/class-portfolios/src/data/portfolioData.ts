export interface PersonData {
  id: string;
  initial: string;
  displayName: string;
  fullName: string;
  overlayColor?: string;
  card: {
    portfolioTitle: string;
    gradeSection: string;
    teacherName: string;
    dateSubmission: string;
    isPlaceholder?: boolean;
  };
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  defaultOpen?: boolean;
  content: SectionContent;
}

export type SectionContent =
  | { type: 'bullet-list'; items: BulletItem[] }
  | { type: 'toc'; rows: { label: string; page: string }[] }
  | { type: 'essay'; paragraphs: string[]; signature?: string }
  | { type: 'writing-tags'; tags: string[] }
  | { type: 'bionote'; imageSrc?: string; name: string; school?: string; bio: string }
  | { type: 'image-thumb'; definition: string; imageSrc: string; caption: string }
  | { type: 'pdf-button'; definition: string; pdfSrc: string }
  | { type: 'placeholder-bullets'; items: string[] }
  | { type: 'writing-section-placeholder' }
  | { type: 'bionote-placeholder'; name: string };

export interface BulletItem {
  title: string;
  note?: string;
}

const BASE = import.meta.env.BASE_URL;

export const DENIM_BG = `${BASE}denim-texture.jpg`;
export const DENVER_IMG_0 = `${BASE}denver-img-0.jpg`;
export const DENVER_IMG_1 = `${BASE}denver-img-1.jpg`;
export const DENVER_IMG_2 = `${BASE}denver-img-2.jpg`;
export const DENVER_PORTRAIT = `${BASE}denver-portrait.png`;
export const GEORGE_PORTRAIT = `${BASE}george-portrait.png`;
export const MEGAN_PORTRAIT = `${BASE}megan-portrait.png`;
export const CRISTEL_PORTRAIT = `${BASE}cristel-portrait.png`;
export const DENVER_PDF = `${BASE}denver-project.pdf`;
export const CRISTEL_PDF = `${BASE}cristel-project.pdf`;
export const CRISTEL_RESUME_PDF = `${BASE}cristel-resume.pdf`;
export const CRISTEL_APP_LETTER_PDF = `${BASE}cristel-app-letter.pdf`;
export const MEGAN_RESUME_PDF = `${BASE}megan-resume.pdf`;
export const MEGAN_APP_LETTER_PDF = `${BASE}megan-app-letter.pdf`;
export const MEGAN_PROJECT_PDF = `${BASE}megan-project.pdf`;
export const GEORGE_APP_LETTER_PDF = `${BASE}george-app-letter.pdf`;
export const GEORGE_RESUME_PDF = `${BASE}george-resume.pdf`;
export const GEORGE_PROJECT_PDF = `${BASE}george-project.pdf`;

// EJK Speech, George + Megan
const EJK_SPEECH: string[] = [
  'Pareho kaming inatasang gumawa ng talumpati tungkol sa mga isyung panlipunan. Bilang mga nakatira sa Pilipinas, alam namin na maraming isyung panlipunan dito tulad ng korapsyon, pagkasira ng kalikasan, kahirapan, at kawalan ng hustisya. Habang mas pinag-isipan namin ito, napagtanto namin na may isang isyu na paulit-ulit nang nangyayari at hanggang ngayon ay patuloy pa rin, ang extrajudicial killings.',
  'Mas lalong nakakabahala ang kasaysayan ng extrajudicial killings (EJKs) kapag naisip natin na hindi lang ito nangyayari sa mga malalayong lugar sa Pilipinas. May mga kaso rin na nangyayari mismo sa mga lugar na tinatawag nating tahanan. Sa aming kaso, ito ay sa Tisa, kung saan kami kasalukuyang nakatira.',
  'Si Father Rudy Romano, na kilala rin bilang "Desaparecido," ay isang paring Katoliko at aktibista na tumulong at nakipagtrabaho sa mahihirap at inaaping komunidad noong panahon ng rehimen ni Marcos. Siya ay dinukot noong Setyembre 11, 1985, at mula noon ay hindi na muling nakita.',
  'Ang "Some People Need Killing," isang libro ni Patricia Evangelista, ay tungkol sa mga EJK noong panahon ni Duterte, hindi 40 taon na ang nakalipas, kundi halos 3 taon lang ang nakaraan. Ayon sa Yale Macmillan Center, pinasok niya ang mundo ng mga pumapatay at ng mga nakaligtas, at naipakita niya ang takot na nabuo nang magpasya ang isang halal na pangulo na may mga buhay na mas mababa ang halaga kaysa sa iba. At ayon naman kay dating Pangulong Duterte, "I\'m not all bad. Some people need killing."',
  'So ano ba ito? Ito ay tungkol sa extrajudicial killings, o mas kilala bilang EJK, ang pagpatay sa mga pinaghihinalaang kriminal kahit walang paglilitis. Nagsimula ang isyung ito noong 2016 at mula noon ay kumitil na ng libo-libong buhay at sumira sa maraming pamilya.',
  'Sa Pilipinas, ang mga EJK ay inuugnay sa "war on drugs" ng gobyerno. Mula 2016 hanggang 2025, maraming kaso ng extrajudicial killings ang naitala sa bansa, ang War on Drugs ni Duterte noong 2016–2022, ang pagkamatay ni Rolando Espinosa noong 2016, ang Ozamiz Police Raid noong 2017, ang pagpatay kay Kian delos Santos, at noong nakaraang taon, nang arestuhin at ilipat ng ICC si dating Pangulong Duterte dahil sa mga kasong crimes against humanity.',
  'Ang Catholic Social Teachings (CST) ay nagtuturo sa atin na ang bawat buhay ay banal at mahalaga. Ayon sa Genesis 1:27, "Nilikha ng Diyos ang tao ayon sa Kanyang wangis." Ibig sabihin nito, ang bawat tao ay may taglay na katangian ng Diyos, kaya lahat ay may likas na dangal, halaga, at kabuluhan.',
  'Ang isyu ng extrajudicial killings ay malinaw na lumalabag sa aral ng dignidad ng tao at kabanalan ng buhay. Inaagaw ng EJK ang karapatan ng isang tao na mabuhay, at tinatrato ang buhay na parang walang halaga at madaling itapon.',
  'Mariin naming tinututulan ang extrajudicial killings. Wala silang karapatang kitilin ang buhay ng ibang tao. Ang buhay ay banal, at kahit mali ang ginawa ng isang tao, may karapatan pa rin siya sa buhay at sa hustisya. Dapat silang bigyan ng pagkakataong magbago, magtuwid ng kanilang mga pagkakamali, at gumawa ng mabuti.',
  'Sa pagtatapos, mali ang extrajudicial killings. Taliwas ito sa Catholic Social Teachings at nagbabanta sa buhay, dignidad, at karapatan ng bawat tao. Malinaw ang aming panawagan: kailangan tayong kumilos. Ang hustisya ay hindi kailanman pagpatay, ito ay pananagutan. Walang sinuman ang mas mababa kaysa sa iba. Walang sinumang kailangang patayin.',
];

// Forced Relocation Speech, Denver + Cristel
const RELOCATION_SPEECH: string[] = [
  'Nakapunta na ba kayo sa BGC? Napakaganda, di ba? Ang lugar na ito ay ang tinaguriang "Global City." Ang BGC ay tila nasa ibang bansa, napakaganda ng mga kalsada, malinis ang mga parke, at sobrang taas ng mga gusaling gawa sa makintab na salamin. Pero alam niyo kung ano ang nasa likod ng paraisong BGC? Ito ay ang mga tirahan ng mga naiwan sa konstruksyon na maaaring iwasak sa kinabukasan para bigyang-daan ang mas malawak pang "pag-unlad." Gaano karami ang mga tao na napilitang lumayas? Ito ay isang katotohanan na hindi lamang nangyayari sa Maynila kundi sa buong Pilipinas, at dapat ito pag-usapan at bigyan ng hustisya, dahil ang tunay na pag-unlad ay hindi dapat makapinsala sa iba, kundi ikabubuti sa lahat.',
  'Sa Pilipinas, maraming pamilyang mahihirap ang nawalan ng tirahan dahil sa pag-unlad ng lungsod, mga proyekto sa pagkontrol sa baha, at mga programa sa pabahay. Bagama\'t ang relokasyon ay sinadya upang mapabuti ang kaligtasan at mga kondisyon ng pamumuhay, maaari itong makaapekto sa kanilang mga trabaho, pag-access sa mga serbisyo, at mga relasyon sa komunidad. Ito ay isang problemang madalas binabanggit pero hindi binibigyang-pansin, dahil ang mga taong namumuhay ng komportable ay nananatiling walang malasakit.',
  'Ayon mismo sa datos ng munisipyo, sa labintatlong milyong tao sa Metro Manila, limang milyon o halos apatnapung porsyento ang nakatira sa mga barung-barong. Alam ng gobyerno ang estadistikang ito, pero ano ang ginagawa nila? Sa halip na pabahay, sapilitang demolisyon ang sagot nila. Ang "forced relocation" ay hindi tulong; ito ay pagtatapon ng tao, tao na may buhay, isip at damdamin. Ayon sa inilathala ng Rappler, pitumpu\'t apat na pamilya lamang ang nabigyan ng katiyakan sa pabahay, habang ang iba ay naiwang umaasa sa barya-baryang tulong dahil tinatawagang "illegal settlers." Pero ang pagiging "illegal" ba ay sapat na dahilan para tanggihan sila ng karapatang mabuhay nang may dignidad?',
  'Ayon sa Vatican, ang pagkakaroon ng marangal na tahanan ay nakaugat sa karapatan sa buhay, dignidad, at seguridad ng pamilya. Malinaw ang kanilang pahayag: "Ang sinumang tao o pamilya na wala sa kanilang sariling pagkakamali ay walang maayos na tirahan, ay biktima ng kawalan ng katarungan." Ang hindi pagbibigay ng gobyerno ng maayos na matitirahan ay isang malaking kawalan ng katarungan, isang bulok na sistema na pumipigil sa mga tao na mamuhay nang may dignidad at dangal gaya ng gusto ng Diyos para sa atin.',
  'Bagama\'t hindi namin sinusuportahan ang paninirahan sa mga ilegal na lugar dahil ito ay mapanganib, naniniwala kami na mas malaking pagkakamali ang sapilitang pagpapaalis sa mga tao nang walang sapat na tulong at suporta. Hindi sapat na wasakin lang ang kanilang bahay; dapat siguraduhin ng gobyerno na ang lilipatan nila ay may maayos na tirahan, trabaho at kaligtasan. Kapag ginawa natin ito nang may malasakit, mabibigyan ang mga pamilya ng pagkakataong makatayo sa sariling paa, magiging patas ang bansa, at magiging mas payapa ang ating mga lungsod dahil wala nang pamilyang naiiwan o natatapon sa kalsada.',
  'Dapat magbigay ang gobyerno ng ligtas na pabahay, mga serbisyo, at tulong sa trabaho bago maganap ang anumang pagpapaalis. Ang bawat tao ay karapat-dapat sa isang marangal na tahanan. Kaya naman, kung seryoso ang gobyerno na lutasin ang isyung ito, kailangang baguhin ang paraan ng paghawak dito, hindi sa pamamagitan ng pagpipilit kundi sa pamamagitan ng pang-unawa.',
];

export const people: PersonData[] = [
  // ─── GROUP ────────────────────────────────────────────────────────────────
  {
    id: 'group',
    initial: '✦',
    displayName: 'Group',
    fullName: 'Grade 11 - SPJP (ABM) – Class Portfolio',
    overlayColor: 'rgba(5,5,20,0.70)',
    card: {
      portfolioTitle: 'Kolektibong Paglalakbay',
      gradeSection: 'Grade 11 - SPJP (ABM)',
      teacherName: 'Bb. Hazel Vindy Garcia',
      dateSubmission: 'April 2026',
    },
    sections: [
      {
        id: 'intro',
        title: 'Introduksyon',
        defaultOpen: true,
        content: {
          type: 'essay',
          paragraphs: [
            'Ang portfolio na ito ay nagpapakita ng aming mga gawa, karanasan, at pag-unlad bilang mga estudyante. Dito makikita ang aming mga sanaysay, talumpati, resume, liham aplikasyon, at panukalang proyekto na sumasalamin sa aming kakayahan, pagsisikap, at mga natutunan sa buong taon.',
          ],
        },
      },
      {
        id: 'acknowledgment',
        title: 'Pasasalamat (Acknowledgment)',
        defaultOpen: false,
        content: {
          type: 'essay',
          paragraphs: [
            'Kami ay taos-pusong nagpapasalamat sa lahat ng aming mga kagrupo para sa kanilang kooperasyon at aktibong pakikilahok. Hindi namin maisasakatuparan ang gawaing ito kung wala ang bawat ambag ninyo.',
            'Lubos din kaming nagpapasalamat sa aming guro sa pagbibigay ng oportunidad na maisagawa ang proyektong ito. Malaki ang naitulong nito sa pagpapalawak ng aming bokabularyo at sa paghasa ng aming kakayahan sa wikang Filipino, na siyang layunin ng gawaing ito mula sa simula.',
            'Isang espesyal na pasasalamat kay George Sarmago, na sa pamamagitan ng kanyang kahusayan sa coding ay nakatulong upang mabuo ang isang maayos at kahanga-hangang website. Gayundin, nais naming kilalanin si Cristel Wang sa kanyang malaking tulong sa pagsasalin ng mga salitang hindi pamilyar sa amin at sa pagpapabilis ng proseso ng pag-proofread. Taos-puso rin kaming nagpapasalamat kay Megan Claire Tan sa kanyang dedikasyon at pagiging maaasahan, kahit biglaan ang gawain o nasaan man siya, lagi niyang ibinibigay ang kanyang buong makakaya. Dagdag pa rito, nais din naming kilalanin si Denver sa kanyang pagsisikap na tumulong sa pag-proofread kasama naming lahat, kahit alam niyang nahihirapan siya sa wika, ipinapakita nito ang kanyang determinasyon at malasakit sa grupo.',
            'Higit sa lahat, nagpapasalamat kami sa lahat ng taong naging bahagi ng aming mga karanasan. Sila ang naging inspirasyon sa mga ideyang aming nailahad sa aming sanaysay, talumpati, resume, at panukalang proyekto. Bagama\'t ang mga ideyang ito ay nagmula sa amin, hinubog naman ito ng mga karanasang aming natamo mula sa mga taong nakapaligid sa amin.',
          ],
        },
      },
      {
        id: 'description',
        title: 'Nilalaman ng Portfolio',
        defaultOpen: false,
        content: {
          type: 'bullet-list',
          items: [
            { title: 'Resume at Liham Aplikasyon', note: 'Nagpapakita ng aming kasipagan, dedikasyon, at kakayahan.' },
            { title: 'Talumpati', note: 'Naglalahad ng aming paninindigan sa isang isyung panlipunan.' },
            { title: 'Artikulo (Sanaysay)', note: 'Sumasalamin sa aming mga karanasan at pag-unlad mula sa aming mga kinatatakutan.' },
            { title: 'Panukalang Proyekto', note: 'Nagpapakita ng aming mga ideya upang makapagbigay ng solusyon at pagbabago.' },
            { title: 'Bionote', note: 'Nagsisilbing maikli ngunit malinaw na pagpapakilala tungkol sa aming sarili at sa aming mga kakayahan.' },
          ],
        },
      },
      {
        id: 'writing-types',
        title: 'Mga Uri ng Sulatin',
        defaultOpen: false,
        content: {
          type: 'bullet-list',
          items: [
            { title: 'Talumpati (Speech)', note: 'Masining at planadong pagpapahayag ng kaisipan at damdamin upang magbigay-kaalaman, manghikayat, o maglahad ng pananaw sa isang mahalagang paksa.' },
            { title: 'Artikulo (Article)', note: 'Naglalahad ng opinyon ng isang indibidwal tungkol sa pagkatao, lipunan, at mga isyu o paksa.' },
            { title: 'Bionote', note: 'Impormatibong talata tungkol sa isang indibidwal.' },
            { title: 'Resume', note: 'Maikling buod ng kasanayan, karanasan, at edukasyon ng isang indibidwal.' },
            { title: 'Liham Aplikasyon (Application Letter)', note: 'Isang sulat na naglalayong ipakita ang interes at kwalipikasyon para sa isang trabaho o posisyon.' },
            { title: 'Panukalang Proyekto (Project Proposal)', note: 'Isang plano o mungkahi ng mga ideya at hakbang upang mapabuti o maisakatuparan ang isang proyekto.' },
          ],
        },
      },
      {
        id: 'talumpati-ejk',
        title: 'Talumpati: Extrajudicial Killings (George Ethan Sarmago & Megan Claire Tan)',
        defaultOpen: false,
        content: {
          type: 'essay',
          paragraphs: EJK_SPEECH,
          signature: 'George Ethan Sarmago & Megan Claire Tan • Grade 11 - SPJP (ABM)',
        },
      },
      {
        id: 'talumpati-relocation',
        title: 'Talumpati: Ang Kapalit sa Manhid na Pag-unlad (Nathaniel Denver T. Uy & Jin Lin T. Wang)',
        defaultOpen: false,
        content: {
          type: 'essay',
          paragraphs: RELOCATION_SPEECH,
          signature: 'Nathaniel Denver T. Uy & Jin Lin T. Wang • Grade 11 - SPJP (ABM)',
        },
      },
    ],
  },

  // ─── MEGAN ────────────────────────────────────────────────────────────────
  {
    id: 'george',
    initial: 'M',
    displayName: 'Megan',
    fullName: 'Megan Claire Tan',
    overlayColor: 'rgba(15,25,50,0.55)',
    card: {
      portfolioTitle: 'Pag-unlad sa bawat Hakbang',
      gradeSection: 'Grade 11 - SPJP (ABM)',
      teacherName: 'Bb. Hazel Vindy Garcia',
      dateSubmission: 'April 2026',
    },
    sections: [
      {
        id: 'prologue',
        title: 'Prologue',
        defaultOpen: true,
        content: {
          type: 'bullet-list',
          items: [
            { title: 'Introduksyon', note: 'Ang portfolio na ito ay nagtatala ng aking paglalakbay bilang isang senior high school student, mula sa pagkatakot at pag-aadjust sa simula, hanggang sa paghanap ng kumpiyansa, tunay na pagkakaibigan, at ng isang bagong bersyon ng aking sarili.' },
            { title: 'Paliwanag ng Pamagat: "Pag-unlad sa bawat Hakbang"', note: 'Ang portfolio na ito ay sumasalamin sa mga proseso ng paglago at pagkatuto bilang isang estudyante. Mula sa pagiging mahiyain at takot sa senior high hanggang sa pagkakaroon ng kumpiyansa at mas malalim na pang-unawa sa sarili, bawat gawa sa portfolio ay isang hakbang sa aking personal at akademikong pag-unlad.' },
            { title: 'Nilalaman ng Portfolio', note: 'Naglalaman ang portfolio na ito ng talumpati, sanaysay, liham aplikasyon, resume, panukalang proyekto, at epilogue.' },
            { title: 'Dedikasyon at Pasasalamat', note: 'Inialay ko ang portfolio na ito sa aking pamilya, sa aking mga kaibigan, at sa Diyos na palaging nandoon para sa akin sa lahat ng hamon at pagsubok.' },
          ],
        },
      },
      {
        id: 'toc',
        title: 'Talaan ng Nilalaman',
        defaultOpen: true,
        content: {
          type: 'toc',
          rows: [
            { label: '1. Talumpati', page: 'p. 1' },
            { label: '2. Sanaysay (Artikulo)', page: 'p. 2' },
            { label: '3. Liham Aplikasyon', page: 'p. 3' },
            { label: '4. Resume', page: 'p. 4' },
            { label: '5. Panukalang Proyekto', page: 'p. 5' },
            { label: '6. Epilogue – Repleksyon', page: 'p. 6' },
          ],
        },
      },
      {
        id: 'talumpati',
        title: 'Talumpati (Megan Claire Tan & George Ethan Sarmago)',
        defaultOpen: false,
        content: { type: 'essay', paragraphs: EJK_SPEECH, signature: 'Megan Claire Tan & George Ethan Sarmago • Grade 11 - SPJP (ABM)' },
      },
      {
        id: 'sanaysay',
        title: 'Sanaysay (Artikulo)',
        defaultOpen: false,
        content: {
          type: 'essay',
          paragraphs: [
            'Ang aking paglalakbay bilang isang senior high school student, noong una, ako ay natatakot at nahihirapan. Ngunit makalipas ang ilang linggo ng pag-aadjust at pagsubok, unti-unti akong nasanay at nagsimulang magkaroon ng kaunting kumpiyansa sa sarili.',
            'Naging mas malapit din ako at mas nakakausap ko ang iba pang mga estudyante sa ABM, mga taong hindi ko akalaing magiging malapit sa akin. Nagkaroon ako ng mga kaibigan na hindi ko inakalang magiging kaibigan ko tulad nina Anika, Fana, Philip, at Juan.',
            'Sa ngayon, ang school year na ito ay nakakapagod ngunit kapalit nito ay napakaraming biyaya. Marami akong naging kaibigan at natuklasan ko ang isang bagong bersyon ng aking sarili.',
            'Noong Grade 10, sobra akong nag-aalala at natatakot dahil pakiramdam ko napakaseryoso at nakakatakot ng senior high school. Pag-akyat ko sa Grade 11, nahirapan ako dahil mas mabilis ang takbo ng mga gawain at mas mahirap kumpara noong Grade 10.',
            'Sa tuwing dumaraan ako sa mga pagsubok at hamon, lumalapit ako sa Diyos. Ang pakikipag-usap sa Kanya ay palaging nakapagpapagaan ng aking pakiramdam. Ikinukuwento ko sa Kanya ang aking araw, ang aking mga problema at mga alalahanin, at nagdarasal ako para sa Kanyang gabay.',
            'Ang pinakamalaki kong takot ay ang pagtanda, ang paglayo, at ang pagbabago ng mga bagay. Ayokong magkahiwa-hiwalay kami ng landas ng aking mga kaibigan at balikan na lamang ang mga alaala na aming nabuo. Habambuhay kong pahahalagahan ang mga alaala na aking nabuo kasama ang aking mga kaibigan.',
            'Natatakot din ako sa pagpasok sa kolehiyo at sa pagharap sa mga bagay nang mag-isa. Upang malampasan ang takot na ito, nagdarasal ako sa Diyos at humihingi ng Kanyang suporta at patnubay habang patuloy akong sumusulong.',
          ],
        },
      },
      {
        id: 'app-letter',
        title: 'Liham Aplikasyon',
        defaultOpen: false,
        content: { type: 'pdf-button', definition: 'Isang sulat na naglalayong ipakita ang interes at kwalipikasyon para sa isang trabaho o posisyon.', pdfSrc: MEGAN_APP_LETTER_PDF },
      },
      {
        id: 'resume',
        title: 'Resume (Curriculum Vitae)',
        defaultOpen: false,
        content: { type: 'pdf-button', definition: 'Maikling buod ng kasanayan, karanasan, at edukasyon ng isang indibidwal.', pdfSrc: MEGAN_RESUME_PDF },
      },
      {
        id: 'panukala',
        title: 'Panukalang Proyekto',
        defaultOpen: false,
        content: { type: 'pdf-button', definition: 'Isang plano o mungkahi ng mga ideya at hakbang upang mapabuti o maisakatuparan ang isang proyekto.', pdfSrc: MEGAN_PROJECT_PDF },
      },
      {
        id: 'epilogue',
        title: 'Epilogue – Repleksyon',
        defaultOpen: false,
        content: {
          type: 'essay',
          paragraphs: [
            'Hindi naging madali para sa akin ang paggawa ng mga sulating ito. Alam ko sa sarili ko na nahihirapan ako sa wikang Filipino, may mga salitang hindi ko maintindihan, at minsan hindi ko rin alam kung paano ito bigkasin o gamitin sa tamang paraan. Pero kahit ganoon, hindi ko hinayaan na hadlang ito para hindi ko ipahayag ang aking sarili.',
            'Sa bawat gawain, pinilit kong subukan kahit kinakabahan at nagdadalawang-isip. Katulad ng naranasan ko sa senior high school, sa simula mahirap at nakakatakot, pero habang tumatagal, natututo rin akong makisabay at mag-adjust. Ganito rin ang nangyari sa akin sa pagsulat at pagsasalita ng Filipino, unti-unti ko itong nasasanayan.',
            'Sa karanasang ito, napagtanto ko na hindi kailangan maging magaling agad. Ang mas mahalaga ay ang lakas ng loob na magpatuloy at matuto kahit nahihirapan. Gusto ko pang hasain ang aking kakayahan at mas maging kampante sa paggamit ng wikang Filipino.',
            'Sa huli, dala ko ang aral na ang pagkatuto ay hindi minamadali. Kahit mabagal ang progreso ko, basta tuloy-tuloy, alam kong darating din ako sa puntong kaya ko nang ipahayag ang aking sarili nang mas malinaw at may kumpiyansa.',
          ],
        },
      },
      {
        id: 'bionote',
        title: "Bionote (Author's Profile)",
        content: {
          type: 'bionote',
          imageSrc: MEGAN_PORTRAIT,
          name: 'Megan Claire Tan',
          school: 'Grade 11 - SPJP (ABM) • Sacred Heart School – Hijas de Jesus',
          bio: 'Si Megan Claire Tan ay isang senior high school student sa Sacred Heart School Hijas de Jesus. Isa lamang siyang karaniwang estudyante na responsable, masipag, at mabuting kaibigan. Mahilig siyang maglakbay, kumain, lumabas kasama ang kanyang mga kaibigan, at maglaan ng oras kasama ang kanyang pamilya. Interesado rin siyang matuto ng iba\'t ibang wika at mahilig maglaro ng Call of Duty kasama ang kanyang mga kaibigan. Sa ilang mga araw, mahilig din siyang mag-Pilates at tumulong sa mga nangangailangan.',
        },
      },
    ],
  },

  // ─── DENVER ───────────────────────────────────────────────────────────────
  {
    id: 'denver',
    initial: 'D',
    displayName: 'Denver',
    fullName: 'Nathaniel Denver T. Uy',
    overlayColor: 'rgba(10,30,20,0.55)',
    card: {
      portfolioTitle: 'Aral sa Bawat Hamon',
      gradeSection: 'Grade 11 - SPJP (ABM)',
      teacherName: 'Bb. Hazel Vindy Garcia',
      dateSubmission: 'April 2026',
    },
    sections: [
      {
        id: 'prologue',
        title: 'Prologue',
        defaultOpen: true,
        content: {
          type: 'bullet-list',
          items: [
            { title: 'Introduksyon', note: 'Ang portfolio na ito ay nagtatala ng aking personal na paglalakbay sa paglaki, lalo na ang aking pakikipaglaban sa takot na magsalita sa harap ng klase at kung paano ko ito naharap sa paglipas ng panahon.' },
            { title: 'Paliwanag ng Pamagat: "Aral sa Bawat Hamon"', note: 'Ang portfolio na ito ay nagpapakita ng aking pagsisikap at determinasyon kahit nahihirapan sa wika o ibang aspeto ng pag-aaral. Ang bawat sanaysay, talumpati, at gawa ay patunay na natututo ako sa bawat hamon, at ang titulong ito ay kumakatawan sa aking kakayahang matuto at lumago sa kabila ng mga pagsubok.' },
            { title: 'Nilalaman ng Portfolio', note: 'Naglalaman ang portfolio na ito ng talumpati, sanaysay, liham aplikasyon, resume, at panukalang proyekto.' },
            { title: 'Dedikasyon at Pasasalamat', note: 'Inialay ko ang portfolio na ito sa aking pamilya, mga kaibigan, at mga gurong patuloy na naniniwala sa aking kakayahan.' },
          ],
        },
      },
      {
        id: 'toc',
        title: 'Talaan ng Nilalaman',
        defaultOpen: true,
        content: {
          type: 'toc',
          rows: [
            { label: '1. Talumpati', page: 'p. 1' },
            { label: '2. Sanaysay (Artikulo)', page: 'p. 2' },
            { label: '3. Liham Aplikasyon', page: 'p. 3' },
            { label: '4. Resume', page: 'p. 4' },
            { label: '5. Panukalang Proyekto', page: 'p. 5' },
            { label: '6. Epilogue – Repleksyon', page: 'p. 6' },
          ],
        },
      },
      {
        id: 'talumpati',
        title: 'Talumpati (Nathaniel Denver T. Uy & Jin Lin T. Wang)',
        defaultOpen: false,
        content: { type: 'essay', paragraphs: RELOCATION_SPEECH, signature: 'Nathaniel Denver T. Uy & Jin Lin T. Wang • Grade 11 - SPJP (ABM)' },
      },
      {
        id: 'sanaysay',
        title: 'Sanaysay (Artikulo)',
        defaultOpen: false,
        content: {
          type: 'essay',
          paragraphs: [
            'Noong bata pa ako, lagi akong natatakot na mag-present sa harap ng buong klase nang mag-isa. Sa tuwing tatawagin ng guro ko ang pangalan ko para magpresenta, kinakabahan ako. Bumibilis ang tibok ng puso ko, nanginginig ang mga kamay ko, at nakalimutan ko na ang dapat kong sabihin. Minsan hindi ko na natapos ang presentation ko dahil nauutal ako. Bilang resulta, kadalasan ay nakakuha ako ng mababang marka para sa aking presentasyon.',
            'Sa paglipas ng mga taon, natuto akong mag-improve sa pamamagitan ng pag-alis sa aking comfort zone para lumahok sa mga kaganapan sa klase, kahit na nakaramdam ako ng kaba. Pagkatapos ng pandemya, parang nagiging matapang ako kapag nagsasalita ako sa harap ng iba. Pakiramdam ko ay nagkaroon na ako ng sapat na lakas ng loob para harapin ang aking mga takot.',
            'Ngunit noong ako ay nasa Baitang 8, kami ay hiniling na magbigay ng talumpati sa aming kampanya sa klase ng pagsasalita. Nang halos turn ko na para magpresenta, pakiramdam ko nawalan na ako ng lakas ng loob na pinaghirapan kong makuha. Pakiramdam ko ay bumalik ako sa dati kong pagkatao noong bata pa ako. Nakaramdam na naman ako ng kaba. Nagsimula akong magduda sa sarili ko.',
            'Nang nakatayo na ako sa harap ng buong klase, naisip ko ang mga bagay na kadalasang nagpapatahimik sa akin kapag nakakaramdam ako ng kaba, ang aking pamilya, ang aking mga kaibigan, at ang mga bagay na nagpapasaya sa akin. Nagkaroon ako ng kalmado. Wala akong perpektong pagsasalita, ngunit nagawa kong tapusin ang aking talumpati nang hindi sumusuko.',
            'Natutunan ko mula sa karanasang ito na ang katapangan ay hindi nangangahulugan na hindi ka natatakot. Nangangahulugan ito na harapin mo ang iyong mga takot kahit natatakot ka. Natutunan kong harapin ang aking mga takot at maging mas matapang sa pamamagitan ng pagharap sa aking takot na magsalita sa harap ng iba.',
          ],
          signature: 'Nathaniel Denver T. Uy • Grade 11 - SPJP (ABM)',
        },
      },
      {
        id: 'liham',
        title: 'Liham Aplikasyon',
        defaultOpen: false,
        content: { type: 'image-thumb', definition: 'Isang sulat na naglalayong ipakita ang interes at kwalipikasyon para sa isang trabaho o posisyon.', imageSrc: DENVER_IMG_0, caption: 'Liham Aplikasyon – Denver' },
      },
      {
        id: 'resume',
        title: 'Resume',
        defaultOpen: false,
        content: { type: 'image-thumb', definition: 'Maikling buod ng kasanayan, karanasan, at edukasyon ng isang indibidwal.', imageSrc: DENVER_IMG_1, caption: 'Resume – Denver' },
      },
      {
        id: 'panukala',
        title: 'Panukalang Proyekto',
        defaultOpen: false,
        content: { type: 'pdf-button', definition: 'Isang plano o mungkahi ng mga ideya at hakbang upang mapabuti o maisakatuparan ang isang proyekto.', pdfSrc: DENVER_PDF },
      },
      {
        id: 'epilogue',
        title: 'Epilogue – Repleksyon',
        defaultOpen: false,
        content: {
          type: 'essay',
          paragraphs: [
            'Ang paggawa ng mga sulating ito ay hindi lang para sa grado, kundi nakatulong din sa aking paglaki bilang tao. Bilang estudyante, nahihirapan talaga ako sa paggamit ng Filipino, lalo na sa pagsasalita sa harap ng klase at sa pagsulat ng pormal na sanaysay. Lagi akong kinakabahan at natatakot magkamali, kaya ang paggawa ng talumpati, sanaysay, resume, liham aplikasyon, at panukalang proyekto ay naging mahirap para sa akin.',
            'Pero sa proseso na ito, natutunan ko na ang pagiging matapang ay hindi ibig sabihin na wala kang takot, kundi ginagawa mo pa rin kahit natatakot ka. Habang nagsusulat at nagsasalita ako, unti-unti akong gumaling at naging mas kumpiyansa sa sarili.',
            'Dahil sa mga gawaing ito, mas naintindihan ko rin ang mga isyung panlipunan at kung gaano kahalaga ang magsalita para sa iba. Natutunan ko na okay lang magkamali kasi parte ito ng pagkatuto. Ang portfolio na ito ay patunay ng aking pagsisikap na subukan ang mga bagay na hindi ko sanay gawin.',
            'Ngayon, dala ko ang mga natutunan ko at handa na akong harapin ang mas mahihirap na hamon. Sa bawat bagong salitang natututunan ko at sa bawat takot na nalalampasan ko, nagiging mas matatag at mas maayos akong bersyon ng aking sarili.',
          ],
        },
      },
      {
        id: 'bionote',
        title: 'Bionote – Talambuhay ng May-akda',
        defaultOpen: false,
        content: {
          type: 'bionote',
          imageSrc: DENVER_PORTRAIT,
          name: 'Nathaniel Denver T. Uy',
          school: 'Grade 11 - SPJP (ABM) • Sacred Heart School–Hijas de Jesus',
          bio: 'Si Nathaniel Denver Uy ay isang 16 taong gulang na mag-aaral sa Sacred Heart School – Hijas de Jesus, Grade 11 - SPJP (ABM). Si Nathaniel ay isang tagahanga ng boksing at hinasa ang kanyang mga kasanayan sa isport sa pamamagitan ng mahigpit na pagsasanay. Bilang karagdagan sa kanyang pagmamahal sa sports, interesado rin si Nathaniel sa negosyo at pananalapi. Sa hinaharap, plano niyang mag-aral sa Unibersidad ng San Carlos at major in Accountancy para mapahusay ang kanyang kakayahan sa larangan.',
        },
      },
    ],
  },

  // ─── CRISTEL ──────────────────────────────────────────────────────────────
  {
    id: 'cristel',
    initial: 'C',
    displayName: 'Cristel',
    fullName: 'Jin Lin T. Wang',
    overlayColor: 'rgba(30,10,30,0.55)',
    card: {
      portfolioTitle: 'Kwentong Nag-uugnay',
      gradeSection: 'Grade 11 - SPJP (ABM)',
      teacherName: 'Bb. Hazel Vindy Garcia',
      dateSubmission: 'April 2026',
    },
    sections: [
      {
        id: 'prologue',
        title: 'Prologue',
        defaultOpen: true,
        content: {
          type: 'bullet-list',
          items: [
            { title: 'Introduksyon', note: 'Ang portfolio na ito ay nagtatala ng aking pagtanggap sa pagbabago at ang aking paglalakbay sa pagkatuto ng wikang Tsino, mula sa pag-aatubili noong ikawalong baitang hanggang sa mapanuring pagtanggap ng isang bagong landas para sa aking kinabukasan.' },
            { title: 'Paliwanag ng Pamagat: "Kwentong Nag-uugnay"', note: 'Ang portfolio na ito ay puno ng mga personal na kwento na nag-uugnay sa aking personal na karanasan, ideya, at natutunan sa buhay at sa pag-aaral. Ipinapakita ng title na ito na kaya kong pagdugtungin ang mga aral at damdamin sa bawat gawa, kaya "Nag-uugnay" angkop na salita.' },
            { title: 'Nilalaman ng Portfolio', note: 'Naglalaman ang portfolio na ito ng talumpati, sanaysay tungkol sa pagbabago at paglago, liham aplikasyon, resume, panukalang proyekto, at epilogue.' },
            { title: 'Dedikasyon at Pasasalamat', note: 'Inialay ko ang portfolio na ito sa aking pamilya, mga kaibigan, at sa lahat ng tumulong sa akin na tanggapin ang pagbabago nang may katatagan at pag-asa.' },
          ],
        },
      },
      {
        id: 'toc',
        title: 'Talaan ng Nilalaman',
        defaultOpen: true,
        content: {
          type: 'toc',
          rows: [
            { label: '1. Talumpati', page: 'p. 1' },
            { label: '2. Sanaysay (Artikulo)', page: 'p. 2' },
            { label: '3. Liham Aplikasyon', page: 'p. 3' },
            { label: '4. Resume', page: 'p. 4' },
            { label: '5. Panukalang Proyekto', page: 'p. 5' },
            { label: '6. Epilogue – Repleksyon', page: 'p. 6' },
          ],
        },
      },
      {
        id: 'talumpati',
        title: 'Talumpati (Jin Lin T. Wang & Nathaniel Denver T. Uy)',
        defaultOpen: false,
        content: { type: 'essay', paragraphs: RELOCATION_SPEECH, signature: 'Jin Lin T. Wang & Nathaniel Denver T. Uy • Grade 11 - SPJP (ABM)' },
      },
      {
        id: 'sanaysay',
        title: 'Sanaysay (Artikulo)',
        defaultOpen: false,
        content: {
          type: 'essay',
          paragraphs: [
            'Pagbabago sa Segundo, Minuto, at Oras',
            'Ang mga bagay na tila "tahanan" ay mga bagay na hindi dali maiwan. Ang tahanan ko ay hindi gamit, ito ay ang mga tao, lugar, at damdaming nagbigay halaga sa aking buhay. Ngunit paano na kung dapat kong umalis sa kasiyahan ko para maabot ang magandang kinabukasan? Noong nasa ikawalong baitang palang ako, hindi ako pinilit ng aking mga magulang, pero, palagi nila akong pinapaalalahanan na seryosohin ang pag-aaral ng wikang Tsines, para makapagtapos ako ng kolehiyo sa bansang Tsina. Noon, talagang tutol ako sa planong ito dahil ang ideya na iiwan ang buhay na binuo ko sa Pilipinas ay nakakatakot para sa akin.',
            'Noong nasa ika siyam na baitang ako, nabigyan ako ng oportunidad na pumunta sa Xiamen, China kasama ang aking mga kaibigan. Isang buwan kami nananatili sa Jimei Da Xue, isang kolehiyo sa Xiamen at doon kami nag-aral ng wika at kultura ng Tsina. Doon ko natagpuan ang maginhawang tanawin, gusali na tila obra maestra, malinamnam na pagkain, at kulturang maringal. Sa palagay ko, ang pagkakataong ito ay ang pinaka-espesyal sa aking buhay. Dito napukaw ang isip at damdamin ko sa pagpili kung sa Pilipinas ako manatili o sa Tsina para magbago ng buhay. Dahil sa pagbabagong isip ko, bumalik ako sa Tsina noong bakasyon ng taong 2025 para husayin ang aking kakayahan sa wikang Tsino.',
            'Ngayon, mas magaling na ako sa pagsasalita ng wika, maari na akong makipag-usap sa mga Tsines ng walang masyadong problema at isang hakbang na lang at mas malapit na ako sa pag-aaral sa Tsina dahil sa pagkuha ko ng HSK. Gayunpaman, nahihirapan parin akong pumili, dahil mahirap timbangin ang puso at isip.',
            'Sa patuloy kong pag-aaral ng wikang Tsino, naging mas apresyatibo ako sa kultura ng Tsina, naging mas masipag ako sa lahat ng aspeto sa pag-aaral at higit sa lahat, dahan dahan ko nang tinatanggap na ang mga karanasan sa buhay ay hindi magtatagal at ito ay palaging nagbabago.',
            'Nasa ikalabing-isang baitang na ako, mas matanda, mas maalam, at sa wakas, ay tanggap na ang pagbabago. Hindi dahil sa naging madali ito, kundi dahil tinulak ako ng mga mabibigat na responsibilidad at ng realidad na ang mundo ay walang tigil sa pag-ikot. Ngunit sa gitna ng lahat ng ito, natutunan kong hindi ko kailangang kumapit nang mahigpit sa isang lugar para maging panatag. Ang tunay na tahanan ay hindi nawawala sa pag-alis; dala-dala ko ito sa bawat hakbang, maganda man o mahirap ang daan.',
          ],
        },
      },
      {
        id: 'application-letter',
        title: 'Liham Aplikasyon',
        defaultOpen: false,
        content: { type: 'pdf-button', definition: 'Isang sulat na naglalayong ipakita ang interes at kwalipikasyon para sa isang trabaho o posisyon.', pdfSrc: CRISTEL_APP_LETTER_PDF },
      },
      {
        id: 'resume',
        title: 'Resume (Curriculum Vitae)',
        defaultOpen: false,
        content: { type: 'pdf-button', definition: 'Maikling buod ng kasanayan, karanasan, at edukasyon ng isang indibidwal.', pdfSrc: CRISTEL_RESUME_PDF },
      },
      {
        id: 'panukala',
        title: 'Panukalang Proyekto',
        defaultOpen: false,
        content: { type: 'pdf-button', definition: 'Isang plano o mungkahi ng mga ideya at hakbang upang mapabuti o maisakatuparan ang isang proyekto.', pdfSrc: CRISTEL_PDF },
      },
      {
        id: 'epilogue',
        title: 'Epilogue – Repleksyon',
        defaultOpen: false,
        content: {
          type: 'essay',
          paragraphs: [
            'Sa lahat ng gawaing ito, hindi lang ako natuto, napilitan din akong harapin ang sarili kong pagkakamali. Alam kong kaya kong magsalita ng wikang Pilipino, ngunit, hindi ko maikakaila na madalas akong natitisod sa mga salita. Minsan alam ko kung ano ang gusto kong sabihin, pero hindi ko ito mailabas nang tama.',
            'Habang tumatagal, napansin ko rin na masyado na akong naging dependiente sa teknolohiya. Parang nawalan ako ng tiwala sa sarili kong kakayahan. Dati, nakakagawa ako ng mga sulatin na puno ng ideya at emosyon nang ako lang. Pero ngayon, napapaisip ako kung tama ba ang bawat salitang ginagamit ko.',
            'Dahil dito, ginawa kong hamon sa sarili ko na tapusin ang aking mga gawain, sanaysay, talumpati, resume, liham aplikasyon, at panukalang proyekto, nang hindi umaasa sa teknolohiya. Hindi man ito naging perpekto, alam kong totoo ito, ngunit bawat pangungusap ay galing sa sariling isip at damdamin ko, at ito ang mas mahalaga.',
            'Sa prosesong ito, doon ko naunawaan kung gaano ko kailangang hasain muli ang sarili ko. Marami pa akong kailangang matutunan, lalo na sa bokabularyo at tamang paggamit ng wika. Pero hindi na ako natatakot doon. Sa halip, gusto ko pa itong pagbutihin.',
            'Gagawin kong layunin na mas umasa sa sarili kong kakayahan kaysa sa teknolohiya. Hindi ko man agad maibalik ang dating galing ko, naniniwala akong unti-unti ko itong maaabot. At sa bawat salitang matutunan ko, mas lalapit ako sa bersyon ng sarili kong alam kong kaya kong maging.',
          ],
        },
      },
      {
        id: 'bionote',
        title: "Bionote (Author's Profile)",
        content: {
          type: 'bionote',
          imageSrc: CRISTEL_PORTRAIT,
          name: 'Jin Lin T. Wang',
          school: 'Grade 11 - SPJP (ABM) • Sacred Heart School – Hijas de Jesus',
          bio: 'Si Jin Lin T. Wang ay isang estudyante na nag-aaral sa Sacred Heart School – Hijas de Jesus. Siya ay nasa Grade 11 - SPJP (ABM). Ipinanganak siya sa Pagadian, Mindanao bilang isang Pilipino na may dugong Tsines at kalaunan ay napunta sa Cebu, ang tinaguriang puso ng Pilipinas. Si Jin Lin, o mas kilala bilang Cristel, ay isang mapagkaibigan, mapagmahal, mapagmalasakit at masiglang dalaga. Dahil sa pagmamahal niya, todo-hilig siya sa kahit anumang bagay na may kaugnayan sa pag-ibig; kadalasan siyang matatagpuan na nananaginip sa araw, nagsusulat ng liham o tula, at nanonood at nagbabasa ng romansa. Mahal na mahal niya ang kanyang pamilya, kaibigan, at ang pamana ng Pilipino at Tsino. Hangad niya na maging taong laging nagsisikap sa lahat ng aspeto ng buhay, para sa kasiyahan ng iba at sa sarili.',
        },
      },
    ],
  },

  // ─── GEORGE ───────────────────────────────────────────────────────────────
  {
    id: 'fana',
    initial: 'G',
    displayName: 'George',
    fullName: 'George Ethan Go Sarmago',
    overlayColor: 'rgba(10,25,35,0.55)',
    card: {
      portfolioTitle: 'Paglalakbay at Panindigan',
      gradeSection: 'Grade 11 - SPJP (ABM)',
      teacherName: 'Bb. Hazel Vindy Garcia',
      dateSubmission: 'April 2026',
    },
    sections: [
      {
        id: 'prologue',
        title: 'Prologue',
        defaultOpen: true,
        content: {
          type: 'bullet-list',
          items: [
            { title: 'Introduksyon', note: 'Ang portfolio na ito ay nagtatala ng aking paglalakbay bilang isang manlalakbay at bilang isang Pilipino, kung paano ang bawat bagong bansa na aking nabisita ay nagpalalim ng aking pagmamahal sa Pilipinas, sa aking pananampalataya, at sa aking pagkatao.' },
            { title: 'Paliwanag ng Pamagat: "Paglalakbay at Panindigan"', note: 'Pinili ko ang title na ito dahil ang portfolio ko ay sumasalamin sa aking mga karanasan at panindigan sa buhay. Ipinapakita nito kung paano ako natuto at lumago sa bawat paglalakbay. Ang "Paglalakbay at Panindigan" ay pinakamainam na salita para ilarawan ang aking pag-unlad at ang mga aral na dala ko sa bawat hakbang.' },
            { title: 'Nilalaman ng Portfolio', note: 'Naglalaman ang portfolio na ito ng talumpati, sanaysay tungkol sa paglalakbay at pagpapahalaga sa tahanan, liham aplikasyon para sa pagiging ICF Assistant, resume, panukalang proyektong Deeper Word, at epilogue.' },
            { title: 'Dedikasyon at Pasasalamat', note: 'Inialay ko ang portfolio na ito sa aking pamilya, at sa Diyos na nagbibigay ng lakas, direksyon, at layunin sa bawat hakbang ng aking buhay.' },
          ],
        },
      },
      {
        id: 'toc',
        title: 'Talaan ng Nilalaman',
        defaultOpen: true,
        content: {
          type: 'toc',
          rows: [
            { label: '1. Talumpati', page: 'p. 1' },
            { label: '2. Sanaysay (Artikulo)', page: 'p. 2' },
            { label: '3. Liham Aplikasyon', page: 'p. 3' },
            { label: '4. Resume', page: 'p. 4' },
            { label: '5. Panukalang Proyekto', page: 'p. 5' },
            { label: '6. Epilogue – Repleksyon', page: 'p. 6' },
          ],
        },
      },
      {
        id: 'talumpati',
        title: 'Talumpati (George Ethan Sarmago & Megan Claire Tan)',
        defaultOpen: false,
        content: { type: 'essay', paragraphs: EJK_SPEECH, signature: 'George Ethan Sarmago & Megan Claire Tan • Grade 11 - SPJP (ABM)' },
      },
      {
        id: 'sanaysay',
        title: 'Sanaysay (Artikulo)',
        defaultOpen: false,
        content: {
          type: 'essay',
          paragraphs: [
            'Ang pangalan ko ay George Ethan Go Sarmago, at naniniwala akong ako ay kahanga-hanga. Naniniwala akong lahat tayo ay gayon, at para sa akin, ang nagtutulak sa isang tao ay ang kanilang hilig. Isa sa aking maraming hilig ay ang paglalakbay. Narinig ko na "Ang paglalakbay ay ang tanging bagay na mabibili mo na nagpapayaman sa iyo" at palagi ko itong pinaninindigan.',
            'Dalawang bansa ang namumukod-tangi. Ang UAE at Turkiye. Ang Dubai ang pinaka-magarbong bansang nabisita ko. Sa sentro mismo, makikita mo kung nasaan ang lahat ng mga post sa Instagram. Ngunit lumabas ka lang nang kaunti at mayroon nang ibang mundo.',
            'Ang talagang tumatak sa akin sa Dubai ay ang napakalakas na komunidad ng mga Pilipino. Walang ganoong pagkakapatiran ang Dubai. Sinigawan ako sa isang wikang hindi ko naiintindihan, iyon ang unang pagkakataon na may nangyaring ganoon sa akin.',
            'Pinalaki ako ng Pilipinas nang tama. Tinuruan kaming maging palakaibigan, magalang sa bisita, at may respeto.',
            'Ang Turkey ay kakaiba at minahal ko ito. Ang arkitektura, ang pagkain, ang klima na nagpakulay-ube sa aking mga daliri. Ngunit ang kanilang mga tao ay hindi gaya ng mga Pilipino.',
            'Sa tuwing bumabalik ako sa Cebu, tinutulungan ako nitong mas mapahalagahan ang aming kultura. Palagi kaming kumakain ng Lechon pagkaalis namin ng Cebu.',
            'Kung tutuusin, laging may kasamang tahimik na takot ang paglalakbay. Bawat bagong bansa ay hindi pamilyar, at may mga sandali kung saan naramdaman kong maliit at hindi sa lugar, lalo na sa Dubai nang may sumigaw sa akin sa wikang hindi ko naiintindihan. Natakot ako nang higit pa sa inaamin ko. Ngunit sa tingin ko, doon mismo nangyari ang paglago. Bawat sandali ng kakulangan sa ginhawa sa ibang bansa ay nagtulak sa akin na mas mapag-aralan ang aking sarili, mas mahigpit na yakapin ang aking mga halaga, at makauwi nang mas nagpapasalamat kaysa noong umalis ako.',
            'Walang katulad ang tahanan. Naninindigan ako sa aking pinagmulan, sa aking pananampalataya, sa aking mga halaga. Ang tahanan ay kung nasaan ang puso.',
          ],
        },
      },
      {
        id: 'app-letter',
        title: 'Liham Aplikasyon',
        defaultOpen: false,
        content: { type: 'pdf-button', definition: 'Isang sulat na naglalayong ipakita ang interes at kwalipikasyon para sa isang trabaho o posisyon.', pdfSrc: GEORGE_APP_LETTER_PDF },
      },
      {
        id: 'resume',
        title: 'Resume (Curriculum Vitae)',
        defaultOpen: false,
        content: { type: 'pdf-button', definition: 'Maikling buod ng kasanayan, karanasan, at edukasyon ng isang indibidwal.', pdfSrc: GEORGE_RESUME_PDF },
      },
      {
        id: 'panukala',
        title: 'Panukalang Proyekto',
        defaultOpen: false,
        content: { type: 'pdf-button', definition: 'Isang plano o mungkahi ng mga ideya at hakbang upang mapabuti o maisakatuparan ang isang proyekto.', pdfSrc: GEORGE_PROJECT_PDF },
      },
      {
        id: 'epilogue',
        title: 'Epilogue – Repleksyon',
        defaultOpen: false,
        content: {
          type: 'essay',
          paragraphs: [
            'Ang paggawa ng mga sulating ito ay hindi lang naging gawain para sa akin, kundi isang mahalagang karanasan para sa aking pagkatuto. Hindi ako ganoon kahusay sa paggamit ng wikang Filipino, at mas sanay akong gumamit ng Bisaya kaya minsan ay nahahalo ko ang dalawang wika. Pero sa kabila nito, pinili kong subukan at pagbutihin ang aking sarili.',
            'Sa paggawa ng talumpati, sanaysay, resume, liham aplikasyon, at panukalang proyekto, naging mas malinaw sa akin kung gaano kahalaga ang aking pinagmulan at ang pagiging Pilipino. Sa buong proseso, unti-unti akong gumaling sa paggamit ng Filipino. Kahit may halo pa ring Bisaya minsan, mas naging maayos ang aking pagsulat at mas lumawak ang aking bokabularyo. Natunan ko din na normal ang magkamali dahil bahagi ito ng pag-aaral.',
            'Sa huli, naging mahalagang karanasan ito para sa akin dahil hindi lang ako natuto sa pagsulat, kundi mas nakilala ko rin ang aking sarili at ang aking mga paniniwala. Handang-handa na akong ipagpatuloy ang paghasa ng aking kakayahan at harapin ang mas marami pang hamon sa hinaharap.',
          ],
        },
      },
      {
        id: 'bionote',
        title: "Bionote (Author's Profile)",
        content: {
          type: 'bionote',
          imageSrc: GEORGE_PORTRAIT,
          name: 'George Ethan Go Sarmago',
          school: 'Grade 11 - SPJP (ABM) • Sacred Heart School – Hijas de Jesus',
          bio: 'Si George Ethan Go Sarmago ay isang mag-aaral sa Sacred Heart School Hijas de Jesus (SHS-HDJ), Grade 11 - SPJP (ABM), sa Cebu. Mahilig siya sa coding, graphic design, paglalakbay, at musika na nagpaparamdam sa iyo na parang nasa pelikula ka. Nagawa na niyang mga tunay na live na website kabilang ang mga landing page para sa The Rise at Monterrazas at Mantawi Residences, at marami pa ang darating. Nakapunta na siya sa siyam na bansa, at bawat di-komportableng sandali sa ibang bansa ay nagturo sa kanya na mas mapag-aralan ang kanyang sarili at makauwi nang mas matatag. Saan man siya pumunta, ang Cebu ang palaging pamantayan.',
        },
      },
    ],
  },
];
