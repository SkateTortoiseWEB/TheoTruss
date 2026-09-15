// Theo Truss — real portfolio content.
// Images uploaded from the portfolio PDF (per-project zip files).

// Natural pixel dimensions of each uploaded image (parsed from JP2 headers),
// used to display images at their true aspect ratios instead of cropping.
const imageDims = {
  "Theo_Truss_Portfoliopdf-image-001.webp": [1245, 1759],
  "Theo_Truss_Portfoliopdf-image-002.webp": [603, 249],
  "Theo_Truss_Portfoliopdf-image-004.webp": [1246, 1760],
  "Theo_Truss_Portfoliopdf-image-005.webp": [1097, 605],
  "Theo_Truss_Portfoliopdf-image-006.webp": [1101, 746],
  "Theo_Truss_Portfoliopdf-image-007.webp": [2000, 1415],
  "Theo_Truss_Portfoliopdf-image-008.webp": [2000, 1350],
  "Theo_Truss_Portfoliopdf-image-009.webp": [1245, 1760],
  "Theo_Truss_Portfoliopdf-image-011.webp": [675, 309],
  "Theo_Truss_Portfolio_pdf-image-014.webp": [879, 1605],
  "Theo_Truss_Portfolio_pdf-image-015.webp": [725, 349],
  "Theo_Truss_Portfolio_pdf-image-016.webp": [1244, 1756],
  "Theo_Truss_Portfolio_pdf-image-017.webp": [974, 864],
  "Theo_Truss_Portfolio_pdf-image-018.webp": [2000, 710],
  "Theo_Truss_Portfolio_pdf-image-019.webp": [2000, 524],
  "Theo_Truss_Portfolio_pdf-image-020.webp": [1075, 1516],
  "Theo_Truss_Portfolio_pdf-image-021.webp": [277, 394],
  "Theo_Truss_Portfolio_pdf-image-022.webp": [279, 397],
  "Theo_Truss_Portfolio_pdf-image-023.webp": [791, 1093],
  "Theo_Truss_Portfolio_pdf-image-024.webp": [517, 764],
  "Theo_Truss_Portfolio_pdf-image-025.webp": [1244, 1753],
  "Theo_Truss_Portfolio_pdf-image-026.webp": [987, 544],
  "Theo_Truss_Portfolio_pdf-image-027.webp": [1168, 819],
  "Theo_Truss_Portfolio_pdf-image-028.webp": [257, 267],
  "Theo_Truss_Portfolio_pdf-image-030.webp": [218, 264],
  "Theo_Truss_Portfolio_pdf-image-032.webp": [218, 264],
  "Theo_Truss_Portfolio_pdf-image-034.webp": [1672, 1018],
  "Theo_Truss_Portfolio_pdf-image-035.webp": [221, 203],
  "Theo_Truss_Portfolio_pdf-image-037.webp": [233, 290],
  "Theo_Truss_Portfolio_pdf-image-039.webp": [233, 290],
  "Theo_Truss_Portfolio_pdf-image-041.webp": [1418, 2000],
  "Theo_Truss_Portfolio_pdf-image-042.webp": [644, 526],
  "Theo_Truss_Portfolio_pdf-image-043.webp": [348, 526],
  "Theo_Truss_Portfolio_pdf-image-044.webp": [588, 337],
  "Theo_Truss_Portfolio_pdf-image-045.webp": [245, 294],
  "Theo_Truss_Portfolio_pdf-image-046.webp": [546, 1062],
};

export const getDims = (url) => {
  const d = imageDims[url.split("/").pop()];
  return d ? { w: d[0], h: d[1] } : null;
};

// Quarter/half turns applied at render time. The source files came out of the
// portfolio PDF on their side; the CDN has no rotate transform, so the fix is
// a CSS transform in PlateImage. Positive = clockwise.
const imageRotation = {
  "Theo_Truss_Portfoliopdf-image-007.webp": -90,
  "Theo_Truss_Portfoliopdf-image-008.webp": -90,
  "Theo_Truss_Portfolio_pdf-image-015.webp": 180,
  "Theo_Truss_Portfolio_pdf-image-023.webp": -90,
  "Theo_Truss_Portfolio_pdf-image-044.webp": 90,
  "Theo_Truss_Portfolio_pdf-image-045.webp": 90,
  "Theo_Truss_Portfolio_pdf-image-046.webp": 90,
};

// Rotation in degrees for an image url: 0, 90, -90 or 180.
export const getRotation = (url) => imageRotation[url.split("/").pop()] ?? 0;

// Dimensions of the image as it appears on screen. A quarter turn swaps the
// axes, so layout (aspect ratios, max-widths) must use these, not getDims.
export const getDisplayDims = (url) => {
  const d = getDims(url);
  if (!d) return null;
  const r = getRotation(url);
  return r === 90 || r === -90 ? { w: d.h, h: d.w } : d;
};

export const projects = [
  {
    id: "accretion",
    title: "Accretion",
    year: "2025–2026",
    location: "margate, kent",
    typology: "assisted living / educational",
    cover: "images/projects/Theo_Truss_Portfoliopdf-image-001.webp",
    images: [
      "images/projects/Theo_Truss_Portfoliopdf-image-001.webp",
      "images/projects/Theo_Truss_Portfoliopdf-image-002.webp",
      "images/projects/Theo_Truss_Portfoliopdf-image-004.webp",
      "images/projects/Theo_Truss_Portfoliopdf-image-005.webp",
      "images/projects/Theo_Truss_Portfoliopdf-image-006.webp",
      "images/projects/Theo_Truss_Portfoliopdf-image-007.webp",
      "images/projects/Theo_Truss_Portfoliopdf-image-008.webp",
      "images/projects/Theo_Truss_Portfoliopdf-image-009.webp",
      "images/projects/Theo_Truss_Portfoliopdf-image-011.webp",
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
    year: "2024–2025",
    location: "the fitzwilliam museum, cambridge",
    typology: "museum masterplan",
    cover: "images/projects/Theo_Truss_Portfolio_pdf-image-014.webp",
    images: [
      "images/projects/Theo_Truss_Portfolio_pdf-image-014.webp",
      "images/projects/Theo_Truss_Portfolio_pdf-image-015.webp",
      "images/projects/Theo_Truss_Portfolio_pdf-image-016.webp",
      "images/projects/Theo_Truss_Portfolio_pdf-image-017.webp",
      "images/projects/Theo_Truss_Portfolio_pdf-image-018.webp",
      "images/projects/Theo_Truss_Portfolio_pdf-image-019.webp",
      "images/projects/Theo_Truss_Portfolio_pdf-image-020.webp",
      "images/projects/Theo_Truss_Portfolio_pdf-image-021.webp",
      "images/projects/Theo_Truss_Portfolio_pdf-image-022.webp",
      "images/projects/Theo_Truss_Portfolio_pdf-image-023.webp",
      "images/projects/Theo_Truss_Portfolio_pdf-image-024.webp",
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
    year: "2025",
    location: "history faculty building, cambridge",
    typology: "multi-faith reflection space",
    cover: "images/projects/Theo_Truss_Portfolio_pdf-image-025.webp",
    images: [
      "images/projects/Theo_Truss_Portfolio_pdf-image-025.webp",
      "images/projects/Theo_Truss_Portfolio_pdf-image-026.webp",
    ],
    body: [
      "The History Faculty building at the University of Cambridge is currently under renovation. The Grade II* listed building, designed by James Stirling in 1968, needs urgent conservation work. The current proposal also looks to integrate the building into the surrounding Sidgewick site. This projects brief called for a fully demountable structure that sat in the corner of the site, providing a new valuable space for the library and surrounding environment. The project presents a multi-faith reflection space, that nestles in the existing ramparts of the Seeley Library.",
      "A timber framed construction would sit onto a gabion wall system, being tied down in between timber columns. I investigated possibilities of using pinned mortise and tenon as well as other traditional barn building joinery as to support a roof that it topped by a skylight.",
    ],
  },
  {
    id: "novigo",
    title: "Novigo",
    year: "2024–ongoing",
    location: "cambridge",
    typology: "design and furniture studio",
    cover: "images/projects/Theo_Truss_Portfolio_pdf-image-027.webp",
    images: [
      "images/projects/Theo_Truss_Portfolio_pdf-image-027.webp",
      "images/projects/Theo_Truss_Portfolio_pdf-image-028.webp",
      "images/projects/Theo_Truss_Portfolio_pdf-image-030.webp",
      "images/projects/Theo_Truss_Portfolio_pdf-image-032.webp",
      "images/projects/Theo_Truss_Portfolio_pdf-image-034.webp",
      "images/projects/Theo_Truss_Portfolio_pdf-image-035.webp",
      "images/projects/Theo_Truss_Portfolio_pdf-image-037.webp",
      "images/projects/Theo_Truss_Portfolio_pdf-image-039.webp",
    ],
    body: [
      "Novigo is a design and furniture studio that I co-founded with another architecture student from Cambridge. Novigo was created as a way to solve the growing problem of inflexible and unsustainable furniture. By finding creative designs in reclaimed timber, multiple configurations for each piece may be constructed from a kit of parts, reducing waste while still using quality timber. As Co-Founder of Novigo, I learned a great deal from enterprise competitions, aiming to turn Novigo into a social enterprise that would use the talent of local designers and provide short term jobs. Although in its infancy, our ideas have been awarded seed funding by one competition, and a runners-up prize in another.",
      "The prototyping and design process has been a wonderful challenge, and has developed my carpentry in thinking about a product design. These two prototypes use no glue, screws or other fixtures, and rely on simple joints and carpentry that is designed to be easy to teach.",
    ],
  },
  {
    id: "a-stage-backstage",
    title: "A Stage, Backstage",
    year: "2023",
    location: "mill road, cambridge",
    typology: "theatre",
    cover: "images/projects/Theo_Truss_Portfolio_pdf-image-041.webp",
    images: [
      "images/projects/Theo_Truss_Portfolio_pdf-image-041.webp",
      "images/projects/Theo_Truss_Portfolio_pdf-image-042.webp",
      "images/projects/Theo_Truss_Portfolio_pdf-image-043.webp",
      "images/projects/Theo_Truss_Portfolio_pdf-image-044.webp",
      "images/projects/Theo_Truss_Portfolio_pdf-image-045.webp",
      "images/projects/Theo_Truss_Portfolio_pdf-image-046.webp",
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
  email: "theotruss@icloud.com",
};