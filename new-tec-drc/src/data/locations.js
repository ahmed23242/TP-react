export const provinces = [
  {
    nom: "Kongo-Central",
    districts: [
      {
        nom: "Lukaya",
        territoires: [
          {
            nom: "Madimba",
            secteurs: [
              {
                nom: "Secteur F",
                villages: [
                  "Ngeba",
                  "Kinzau-Mvuete",
                  "Kimpese",
                  "Luozi",
                  "Mbanza-Ngungu",
                  "Nkamba",
                  "Songololo"
                ]
              }
            ]
          },
          {
            nom: "Kasangulu",
            secteurs: [
              {
                nom: "Secteur A",
                villages: [
                  "Kasangulu-Centre",
                  "Kimwenza",
                  "Mbanza-Mazina",
                  "Nkandu"
                ]
              }
            ]
          }
        ]
      },
      {
        nom: "Cataractes",
        territoires: [
          {
            nom: "Mbanza-Ngungu",
            secteurs: [
              {
                nom: "Secteur B",
                villages: [
                  "Kimpangu",
                  "Kwilu-Ngongo",
                  "Lukunga",
                  "Mbanza-Manteke",
                  "Nzundu"
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    nom: "Kinshasa",
    districts: [
      {
        nom: "Mont-Amba",
        territoires: [
          {
            nom: "Lemba",
            secteurs: [
              {
                nom: "Secteur C",
                villages: [
                  "Livulu",
                  "Lemba-Terminus",
                  "Campus",
                  "Righini"
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    nom: "Kwango",
    districts: [
      {
        nom: "Kwango",
        territoires: [
          {
            nom: "Kenge",
            secteurs: [
              {
                nom: "Secteur D",
                villages: [
                  "Kenge-Centre",
                  "Mosango",
                  "Panzi",
                  "Yasa-Lokwa"
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

// Fonction pour obtenir les districts d'une province
export const getDistricts = (provinceName) => {
  const province = provinces.find(p => p.nom === provinceName);
  return province ? province.districts : [];
};

// Fonction pour obtenir les territoires d'un district
export const getTerritoires = (provinceName, districtName) => {
  const district = getDistricts(provinceName).find(d => d.nom === districtName);
  return district ? district.territoires : [];
};

// Fonction pour obtenir les secteurs d'un territoire
export const getSecteurs = (provinceName, districtName, territoireName) => {
  const territoire = getTerritoires(provinceName, districtName).find(t => t.nom === territoireName);
  return territoire ? territoire.secteurs : [];
};

// Fonction pour obtenir les villages d'un secteur
export const getVillages = (provinceName, districtName, territoireName, secteurName) => {
  const secteur = getSecteurs(provinceName, districtName, territoireName).find(s => s.nom === secteurName);
  return secteur ? secteur.villages : [];
}; 