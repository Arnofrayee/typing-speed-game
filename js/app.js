const wordLists = {
  easy: [
    "chat",
    "chien",
    "pain",
    "lait",
    "eau",
    "sucre",
    "table",
    "chaise",
    "porte",
    "mur",
    "main",
    "pied",
    "tête",
    "nez",
    "yeux",
    "bras",
    "jambe",
    "dos",
    "ami",
    "amie",
    "père",
    "mère",
    "frère",
    "soeur",
    "jour",
    "nuit",
    "matin",
    "soir",
    "hier",
    "demain",
    "ici",
    "là",
    "oui",
    "non",
    "bien",
    "mal",
    "vite",
    "lent",
    "haut",
    "bas",
    "gros",
    "petit",
    "beau",
    "laid",
    "vrai",
    "faux",
    "bon",
    "mauvais",
    "chaud",
    "froid",
    "plein",
    "vide",
    "dur",
    "mou",
    "clair",
    "sombre",
    "neuf",
    "vieux",
  ],
  medium: [
    "maison",
    "voiture",
    "ordinateur",
    "clavier",
    "écran",
    "téléphone",
    "fenêtre",
    "cuisine",
    "salon",
    "chambre",
    "bureau",
    "travail",
    "école",
    "collège",
    "université",
    "professeur",
    "élève",
    "étudiant",
    "exercice",
    "question",
    "réponse",
    "solution",
    "problème",
    "histoire",
    "géographie",
    "science",
    "nature",
    "animal",
    "plante",
    "montagne",
    "rivière",
    "océan",
    "forêt",
    "prairie",
    "désert",
    "nuage",
    "pluie",
    "orage",
    "vent",
    "soleil",
    "étoile",
    "planète",
    "galaxie",
    "univers",
    "énergie",
    "force",
    "vitesse",
    "distance",
    "volume",
    "surface",
    "température",
    "pression",
    "matière",
    "atome",
    "molécule",
    "réaction",
    "expérience",
    "analyse",
    "mesure",
    "calcul",
  ],
  hard: [
    "administration",
    "organisationnelle",
    "responsabilité",
    "professionnel",
    "développement",
    "implémentation",
    "international",
    "communication",
    "interprétation",
    "collaboration",
    "coordination",
    "expérimentale",
    "documentation",
    "classification",
    "transformation",
    "optimisation",
    "configuration",
    "synchronisation",
    "visualisation",
    "représentation",
    "identification",
    "authentification",
    "autorisation",
    "infrastructure",
    "architecture",
    "algorithmique",
    "programmation",
    "compilation",
    "interopérabilité",
    "compatibilité",
    "virtualisation",
    "automatisation",
    "orchestration",
    "distribution",
    "sauvegarde",
    "restauration",
    "supervision",
    "monitoring",
    "performance",
    "scalabilité",
    "résilience",
    "tolérance",
    "redondance",
    "migration",
    "intégration",
    "déploiement",
    "validation",
    "vérification",
    "évaluation",
    "amélioration",
    "innovation",
    "technologique",
    "scientifique",
    "méthodologie",
    "statistique",
    "probabilité",
    "modélisation",
    "simulation",
    "corrélation",
    "causalité",
  ],
};
let currentDifficulty = "easy";

const $wpm = document.getElementById("wpm");
const $acc = document.getElementById("acc");
const $time = document.getElementById("time");
const $buttons = document.querySelectorAll(".selectButton");
const $startDialog = document.querySelector(".start1");
const $backText = document.getElementById("backText");
const $startTest = document.getElementById("startTest");
const $area = document.getElementById("typeTest");
const $bottomHr = document.querySelector(".bottomHr")
const showWords = () => {
  let randomWords = [];
  for (let i = 0; i < 30; i++) {
    let randomIndex = Math.floor(
      Math.random() * wordLists[currentDifficulty].length,
    );
    randomWords.push(wordLists[currentDifficulty][randomIndex]);
  }
  $backText.innerHTML = "";
  randomWords.forEach((element) => {
    const span = document.createElement("span");
    span.classList.add("textPreset1Rm", "neutral400");
    $backText.appendChild(span);
    span.textContent = element;
  });
};
$buttons.forEach((button) => {
  button.addEventListener("click", () => {
    currentDifficulty = button.textContent.toLowerCase();
    showWords();
    console.log(currentDifficulty);
  });
});

$startTest.addEventListener("click", () => {
  showWords();
  $startDialog.close();
  $area.classList.remove("typeTestHide")
  $area.classList.add("typeTestShow")
  $bottomHr.classList.remove("bottomHrHide")
  $bottomHr.classList.add("showBHR")
  $area.focus()
  startTimer()
});
let trackWords = 0
let totalWords = 0
let correctWords = 0
$area.addEventListener("input", () => {
    if($area.value.at(-1) == " ") {
        if ($backText.children[trackWords].textContent == $area.value.trim()) {
            $backText.children[trackWords].classList.add("green500")
            
             correctWords++
        }
        else {
        $backText.children[trackWords].classList.add("red500", "underline")
        }
        totalWords++;
        trackWords++;
        if (trackWords == 30) {
            showWords()
            trackWords =0
        }
        $wpm.textContent = Math.round(correctWords / timeSpent * 60)
        $acc.textContent = Math.round(correctWords / totalWords * 100) + "%"
        $area.value = ""
    }
})
let timeSpent = 0
let interval = null
function startTimer() {
interval = setInterval(() => {
    timeSpent++
    $time.textContent = "0:0" + timeSpent
    if (timeSpent == 60) {
        clearInterval(interval)
    }
    if (timeSpent >= 10) {
        $time.textContent = "0:" + timeSpent
    }
}, 1000) 
}

