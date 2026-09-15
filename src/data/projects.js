// Theo Truss — real portfolio content.
// Images uploaded from the portfolio PDF (per-project zip files).

// Natural pixel dimensions of each uploaded image (parsed from JP2 headers),
// used to display images at their true aspect ratios instead of cropping.
const imageDims = {
  "d1d96c96d_Theo_Truss_Portfoliopdf-image-001.jpg": [1245, 1759],
  "597bc10ca_Theo_Truss_Portfoliopdf-image-002.jpg": [603, 249],
  "fadc6af3f_Theo_Truss_Portfoliopdf-image-004.jpg": [1246, 1760],
  "c8a82871e_Theo_Truss_Portfoliopdf-image-005.jpg": [1097, 605],
  "185a64841_Theo_Truss_Portfoliopdf-image-006.jpg": [1101, 746],
  "6a2dc77b2_Theo_Truss_Portfoliopdf-image-007.jpg": [3452, 2443],
  "ec9346ec0_Theo_Truss_Portfoliopdf-image-008.jpg": [3218, 2172],
  "26ad15e1b_Theo_Truss_Portfoliopdf-image-009.jpg": [1245, 1760],
  "46a673846_Theo_Truss_Portfoliopdf-image-010.jpg": [501, 1607],
  "d338db04b_Theo_Truss_Portfoliopdf-image-011.jpg": [675, 309],
  "cc0e8e937_Theo_Truss_Portfolio_pdf-image-014.jpg": [879, 1605],
  "23c5a2083_Theo_Truss_Portfolio_pdf-image-015.jpg": [725, 349],
  "f808beb1d_Theo_Truss_Portfolio_pdf-image-016.jpg": [1244, 1756],
  "a6192cb3e_Theo_Truss_Portfolio_pdf-image-017.jpg": [974, 864],
  "35ddcf855_Theo_Truss_Portfolio_pdf-image-018.jpg": [3333, 1183],
  "9415b3c32_Theo_Truss_Portfolio_pdf-image-019.jpg": [2335, 612],
  "eb8946c00_Theo_Truss_Portfolio_pdf-image-020.jpg": [1075, 1516],
  "17830b9c3_Theo_Truss_Portfolio_pdf-image-021.jpg": [277, 394],
  "db85fac69_Theo_Truss_Portfolio_pdf-image-022.jpg": [279, 397],
  "96938d58c_Theo_Truss_Portfolio_pdf-image-023.jpg": [791, 1093],
  "be79a8e31_Theo_Truss_Portfolio_pdf-image-024.jpg": [517, 764],
  "31ea24725_Theo_Truss_Portfolio_pdf-image-025.jpg": [1244, 1753],
  "b030f4188_Theo_Truss_Portfolio_pdf-image-026.jpg": [987, 544],
  "742770144_Theo_Truss_Portfolio_pdf-image-027.jpg": [1168, 819],
  "e1dc3753b_Theo_Truss_Portfolio_pdf-image-028.jpg": [257, 267],
  "f06221589_Theo_Truss_Portfolio_pdf-image-030.jpg": [218, 264],
  "50a6947f5_Theo_Truss_Portfolio_pdf-image-032.jpg": [218, 264],
  "1f14a83c2_Theo_Truss_Portfolio_pdf-image-034.jpg": [1672, 1018],
  "84017bdc1_Theo_Truss_Portfolio_pdf-image-035.jpg": [221, 203],
  "a22f88769_Theo_Truss_Portfolio_pdf-image-037.jpg": [233, 290],
  "dba3dbeb1_Theo_Truss_Portfolio_pdf-image-039.jpg": [233, 290],
  "0b77a2ea1_Theo_Truss_Portfolio_pdf-image-041.jpg": [1434, 2023],
  "f2fc168d8_Theo_Truss_Portfolio_pdf-image-042.jpg": [644, 526],
  "92bb51aad_Theo_Truss_Portfolio_pdf-image-043.jpg": [348, 526],
  "2d6d1ef25_Theo_Truss_Portfolio_pdf-image-044.jpg": [588, 337],
  "163ec5a0b_Theo_Truss_Portfolio_pdf-image-045.jpg": [245, 294],
  "57b40d9d0_Theo_Truss_Portfolio_pdf-image-046.jpg": [546, 1062],
};

export const getDims = (url) => {
  const d = imageDims[url.split("/").pop()];
  return d ? { w: d[0], h: d[1] } : null;
};

export const projects = [
  {
    id: "accretion",
    title: "Accretion",
    year: "2023–2026",
    location: "margate, kent",
    typology: "assisted living / educational",
    cover: "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/d1d96c96d_Theo_Truss_Portfoliopdf-image-001.jpg",
    images: [
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/d1d96c96d_Theo_Truss_Portfoliopdf-image-001.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/597bc10ca_Theo_Truss_Portfoliopdf-image-002.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/fadc6af3f_Theo_Truss_Portfoliopdf-image-004.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/c8a82871e_Theo_Truss_Portfoliopdf-image-005.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/185a64841_Theo_Truss_Portfoliopdf-image-006.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/6a2dc77b2_Theo_Truss_Portfoliopdf-image-007.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/ec9346ec0_Theo_Truss_Portfoliopdf-image-008.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/26ad15e1b_Theo_Truss_Portfoliopdf-image-009.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/46a673846_Theo_Truss_Portfoliopdf-image-010.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/d338db04b_Theo_Truss_Portfoliopdf-image-011.jpg",
    ],
    body: [
      "The topography, natural and urban, of the Old Town of Margate, has undergone various eras of change since its growth from a small settlement in the late middle ages. Whereas the early accretion of the Old Town grew from key routes to the sea, the mid 18th century saw the introduction of squares and other internally facing developments, refacing and often covering up original timber framed structures. In the early 19th century, much larger structures such as Cobbs Brewery started to interrupt the scale of the spaces of the old town. Today, many of these structures are replaced by equally large modern iterations, such as a care-home that now sits over the site of the brewery.",
      "This project learns from previous structures and contexts, mapping them not to recreate the past, but instead to learn from the qualities of spaces that used to exist, to create a new iteration of this topography, dissolving oversized structures down to the scale of the Old Town. By altering the existing concrete frames, and strategically placing new walls, resilient and sustainable spaces may emerge. This particular iteration uses the spaces for a shared programme: an assisted living complex (which provides a variety of accommodation from more independent units, to ones that require closer support) that shares an urban block interior with a primary school and nursery. The groundline of the site, moving up the side of the valley that Margate sits in, provides opportunity for these functions to operate more independently.",
      "Similar to the previous changes of character of the buildings in Margate, the existing frames and the new frames of the buildings would be refaces in a dark, striated material such as a dark brick, mixed with reclaimed material from local demolitions, such as slate. In this way, the structures will seem to rise from the ground, be of the earth, as well as becoming a stratigraphic representation of built memory. Within the urban block perimeter, a path is drawn from King St (at the bottom of this drawing), walking up the valley towards the sea, drawing a walkable route through this block of the Old Town, where before it was impassable.",
      "The cellular arrangement of the buildings allow a variety of spaces to emerge. Precedents include Aldo van Eyck’s Amsterdam Orphanage, Hans Scharoun’s Darmstadt Primary School, and the Antonianiko Complex in Vatheia, Greece. In this way, the clusters are resilient enough to have internal and external spaces that support varying uses and degrees of privacy. Ultimately these volumes are to be wholly of the landscape.",
      "The cellular clusters also adapt over time, as the same key walls can easily accommodate multiple cells being joined together, for example if two single apartments were joined together. Where the existing floor slabs must be cut, the remaining material around each column (approx. 100mm) can give opportunity for another layer of insulation.",
    ],
  },
  {
    id: "artefacts",
    title: "Artefacts",
    year: "2023–2026",
    location: "the fitzwilliam museum, cambridge",
    typology: "museum masterplan",
    cover: "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/cc0e8e937_Theo_Truss_Portfolio_pdf-image-014.jpg",
    images: [
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/cc0e8e937_Theo_Truss_Portfolio_pdf-image-014.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/23c5a2083_Theo_Truss_Portfolio_pdf-image-015.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/f808beb1d_Theo_Truss_Portfolio_pdf-image-016.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/a6192cb3e_Theo_Truss_Portfolio_pdf-image-017.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/35ddcf855_Theo_Truss_Portfolio_pdf-image-018.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/9415b3c32_Theo_Truss_Portfolio_pdf-image-019.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/eb8946c00_Theo_Truss_Portfolio_pdf-image-020.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/17830b9c3_Theo_Truss_Portfolio_pdf-image-021.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/db85fac69_Theo_Truss_Portfolio_pdf-image-022.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/96938d58c_Theo_Truss_Portfolio_pdf-image-023.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/be79a8e31_Theo_Truss_Portfolio_pdf-image-024.jpg",
    ],
    body: [
      "The Fitzwilliam Museum sits as an island, the site and the collections both disconnected from the city of Cambridge. In this second-year project, a masterplan proposes careful alterations and changes to the museum fabric, as well as new routes around Cambridge, that help better integrate the Fitzwilliam collections into the city. Any museum may be considered as a home for the artefacts and the art (crucially an impermanent yet significant one). The Fitzwilliam — Greek Revival and distinctly imperial — is built to appear permanent to establish authority, and therefore a perception of authenticity. However, the building currently fails to recognise its relative impermanence to the artefacts that it is responsible for. Much of the challenge therefore is to give power back to the artefacts, and indeed the stories, memories, and people behind them. The museum both as an object, and a protector of history, is inherently associated with the imperial leverage over the acquisition of artefacts in its past. The origins of the initial funding for the museum is rooted in the trans-Atlantic slave trade, and any new intervention to the museum must come to terms with this. The museum must be an instrument to teach a transparency about this, as well as one made to serve the objects and stories within.",
      "This project proposes purposeful interventions to the building fabric. One of the boldest is to place the entrance on the end of the eastern elevation (right), cutting though the southernmost projection of the portico. This encourages the visitor to enter the building before experiencing the tight intercolumniation of the portico, which no longer locks the museum from the city, but instead frames it. Visitors enter the museum into new loggias (built using reclaimed brick and stone from the current steps), with ‘in-between’ spaces employed as both new exhibition space but also as to de-centre the visitor from the current walls of the museum. The materiality and construction of these loggias draws inspiration from many of Hans Döllgast’s projects in Munich.",
      "The second incision into the fabric of the museum, through the stairwell of the 1970’s extension to the south (below), results in a similar gateway to the Founder’s building cut. These tall passageways allow the visitor to confront the material of the museum as an artefact itself, the different layers of which are made legible through more accessible entrances. Where the Founder’s building entrance is moved to be step-free, the new entrance for the 1970’s extension reorientates the museum to acknowledge its length, also reinstating the courtyard that was filled in by an early 2000’s extension. The new St Peter’s Terrace entrance, to the south of Grove Lodge (Left), references both the existing portico of the house, as part of the aim to create a more domestic environment for exhibiting artefacts, and also the other gate typologies that are found in the rest of the proposal. For instance, gates made from material reclaimed in the alterations to the existing building fabric would mark trails around Cambridge and the fenland, joining together other museums, and spaces designed to deliver a talk to a small group. Over time, the gates would be designed to decay, leaving only their stone feet.",
      "Each of the three interventions help establish a new axis in how the museum is experienced, acknowledging its length while dissolving the harsh boarders to the street.",
      "By making spaces where artefacts can be displayed in different ways, for example in the more domestic setting of St Peters terrace, the collections can better integrate with the city. By making space for demonstrations, and by moving artefacts, the museum buildings are more resilient in adapting to the needs of the collection. Much of this project focused on material reuse, and by building a schedule of available materials, new solutions do not have to depend so heavily on new materials. A short book created to accompany this project notes key discussions and ideas behind asking what the Fitzwilliam Museum can be. In establishing a new educational component to the museum, this booklet discusses how teaching spaces can integrate into both the domains of the city, and the museum, as well as showing designs for educational toys that I designed alongside this project, based off Froebelian gifts.",
    ],
  },
  {
    id: "reflection",
    title: "Reflection",
    year: "2023–2026",
    location: "history faculty building, cambridge",
    typology: "multi-faith reflection space",
    cover: "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/31ea24725_Theo_Truss_Portfolio_pdf-image-025.jpg",
    images: [
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/31ea24725_Theo_Truss_Portfolio_pdf-image-025.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/b030f4188_Theo_Truss_Portfolio_pdf-image-026.jpg",
    ],
    body: [
      "The History Faculty building at the University of Cambridge is currently under renovation. The Grade II* listed building, designed by James Stirling in 1968, needs urgent conservation work. The current proposal also looks to integrate the building into the surrounding Sidgewick site. This projects brief called for a fully demountable structure that sat in the corner of the site, providing a new valuable space for the library and surrounding environment. The project presents a multi-faith reflection space, that nestles in the existing ramparts of the Seeley Library.",
      "A timber framed construction would sit onto a gabion wall system, being tied down in between timber columns. I investigated possibilities of using pinned mortise and tenon as well as other traditional barn building joinery as to support a roof that it topped by a skylight.",
    ],
  },
  {
    id: "Dissertation",
    title: "Dissertation",
    year: "2025–2026",
    location: "history faculty building, cambridge",
    typology: "multi-faith reflection space",
    cover: "https://previews.dropbox.com/p/thumb/ADLvC3cQzmFxTnUuohU93yWmhBSU7Kq11cXV00E9Zs01X__uk0VguKc730T7hu7aZDXirFCPqAPsTSo1nacUY_pnuYeTnGtV7UkxUhHVXqiA8erDhRSS98Wh5uL_dLwSWkS66boqajUiiprJUVeTL5MfcC9OsL5R5GYiKh6zLwkQLeeEsWht9RYBDk1bis2waRcnT2gWKsh_BwstVThW3KGdlF0m-TXC038YmXJOsvewIFxZjjHDODiJNzcaAsYfue9KFgArBi00cpmqKLsRnBqLGAuBtMjD9ZBbIhmpW9mssc9ukSNIifzZ0hDAavRy7oLWVb4oa0Hw10cH6njFYuUs/p.jpeg?is_prewarmed=true",
    images: [
      "https://previews.dropbox.com/p/thumb/ADLvC3cQzmFxTnUuohU93yWmhBSU7Kq11cXV00E9Zs01X__uk0VguKc730T7hu7aZDXirFCPqAPsTSo1nacUY_pnuYeTnGtV7UkxUhHVXqiA8erDhRSS98Wh5uL_dLwSWkS66boqajUiiprJUVeTL5MfcC9OsL5R5GYiKh6zLwkQLeeEsWht9RYBDk1bis2waRcnT2gWKsh_BwstVThW3KGdlF0m-TXC038YmXJOsvewIFxZjjHDODiJNzcaAsYfue9KFgArBi00cpmqKLsRnBqLGAuBtMjD9ZBbIhmpW9mssc9ukSNIifzZ0hDAavRy7oLWVb4oa0Hw10cH6njFYuUs/p.jpeg?is_prewarmed=true",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/b030f4188_Theo_Truss_Portfolio_pdf-image-026.jpg",
    ],
    body: [
      "The History Faculty building at the University of Cambridge is currently under renovation. The Grade II* listed building, designed by James Stirling in 1968, needs urgent conservation work. The current proposal also looks to integrate the building into the surrounding Sidgewick site. This projects brief called for a fully demountable structure that sat in the corner of the site, providing a new valuable space for the library and surrounding environment. The project presents a multi-faith reflection space, that nestles in the existing ramparts of the Seeley Library.",
      "A timber framed construction would sit onto a gabion wall system, being tied down in between timber columns. I investigated possibilities of using pinned mortise and tenon as well as other traditional barn building joinery as to support a roof that it topped by a skylight.",
    ],
  },
  {
    id: "novigo",
    title: "Novigo",
    year: "2023–2026",
    location: "cambridge",
    typology: "design and furniture studio",
    cover: "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/742770144_Theo_Truss_Portfolio_pdf-image-027.jpg",
    images: [
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/742770144_Theo_Truss_Portfolio_pdf-image-027.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/e1dc3753b_Theo_Truss_Portfolio_pdf-image-028.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/f06221589_Theo_Truss_Portfolio_pdf-image-030.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/50a6947f5_Theo_Truss_Portfolio_pdf-image-032.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/1f14a83c2_Theo_Truss_Portfolio_pdf-image-034.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/84017bdc1_Theo_Truss_Portfolio_pdf-image-035.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/a22f88769_Theo_Truss_Portfolio_pdf-image-037.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/dba3dbeb1_Theo_Truss_Portfolio_pdf-image-039.jpg",
    ],
    body: [
      "Novigo is a design and furniture studio that I co-founded with another architecture student from Cambridge. Novigo was created as a way to solve the growing problem of inflexible and unsustainable furniture. By finding creative designs in reclaimed timber, multiple configurations for each piece may be constructed from a kit of parts, reducing waste while still using quality timber. As Co-Founder of Novigo, I learned a great deal from enterprise competitions, aiming to turn Novigo into a social enterprise that would use the talent of local designers and provide short term jobs. Although in its infancy, our ideas have been awarded seed funding by one competition, and a runners-up prize in another.",
      "The prototyping and design process has been a wonderful challenge, and has developed my carpentry in thinking about a product design. These two prototypes use no glue, screws or other fixtures, and rely on simple joints and carpentry that is designed to be easy to teach.",
    ],
  },
  {
    id: "a-stage-backstage",
    title: "A Stage, Backstage",
    year: "2023–2026",
    location: "mill road, cambridge",
    typology: "theatre",
    cover: "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/0b77a2ea1_Theo_Truss_Portfolio_pdf-image-041.jpg",
    images: [
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/0b77a2ea1_Theo_Truss_Portfolio_pdf-image-041.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/f2fc168d8_Theo_Truss_Portfolio_pdf-image-042.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/92bb51aad_Theo_Truss_Portfolio_pdf-image-043.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/2d6d1ef25_Theo_Truss_Portfolio_pdf-image-044.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/163ec5a0b_Theo_Truss_Portfolio_pdf-image-045.jpg",
      "https://media.base44.com/images/public/6aa801bf24e97fd8bd96807f/57b40d9d0_Theo_Truss_Portfolio_pdf-image-046.jpg",
    ],
    body: [
      "This first-year project proposes a new theatre on Mill Road, a community with a strong sense of identity, that holds firm amongst the changing environment and increased inequality in Cambridge. The design was initially guided by Thornton Wilder’s Our Town, a play which deals with themes of community and loss, and is written with very little set, the stage manager playing a key role in the play itself. This inspired my proposal, using the mechanics of the barn typologies as a theatrical device to reveal, or obscure views to the town outside. The audience sits in a transverse stage, facing other audience members as well as the play. A moveable lantern in the roof of the former pool hall also acts as the fly tower, moving from opening to opening between each act. The aim of the theatre was to construct spaces for the community of Mill Road, a venue where performances include the town itself.",
    ],
  },
];

export const getProject = (id) => projects.find((p) => p.id === id);

export const cv = {
  statement:
    "Theo Truss is a Part I Architecture graduate from the University of Cambridge",
  education: [
    { title: "Architecture (BA)", place: "University of Cambridge", years: "2023–2026" },
  ],
  experience: [
    { role: "Co-founder", place: "Novigo — design and furniture studio", years: "Cambridge" },
  ],
  awards: [
    { title: "Gilbert Laurie Cadell Prize for Architecture", years: "2026" },
  ],
  skills: [
    "carpentry",
    "model making",
    "product design",
    "architectural design",
    "material reuse",
    "traditional joinery",
  ],
  email: "theo.truss@example.com",
};