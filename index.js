var app = new Vue({
  el: "#app",
  data: {
    voicelines: [],
    search: "",
    search_debounced: "",
    class_filters: [
      {id: "scout", name: "Scout", val: true},
      {id: "soldier", name: "Soldier", val: false},
      {id: "pyro", name: "Pyro", val: false},
      {id: "demo", name: "Demoman", val: false},
      {id: "heavy", name: "Heavy", val: false},
      {id: "engineer", name: "Engineer", val: false},
      {id: "medic", name: "Medic", val: false},
      {id: "sniper", name: "Sniper", val: false},
      {id: "spy", name: "Spy", val: false},
      {id: "admin", name: "Administrator", val: false},
      {id: "misspauling", name: "Miss Pauling", val: false},
      {id: "hhh", name: "Horseless Headless Horsemann", val: false},
      {id: "monoculus", name: "Monoculus", val: false},
      {id: "merasmus", name: "Merasmus", val: false},
      {id: "bombinomicon", name: "Bombinomicon", val: false},
      {id: "pumpkin", name: "Pumpkin Bomb", val: false},
      {id: "redmond", name: "Redmond Mann", val: false},
      {id: "blutarch", name: "Blutarch Mann", val: false},
      {id: "brothers", name: "Mann Brothers", val: false}
    ]
  },
  watch: {
    search: _.debounce(function() {
      this.search_debounced = this.search;
    }, 100)
  },
  methods: {
    play: function(link) {
      var audio = document.getElementById("audio-container");
      audio.innerHTML = "<audio autoplay><source src=\"" + link + "\"></source></audio>";
    },
    filter: function(voicelines) {
      var _this = this;
      var search = this.search_debounced.toUpperCase();
      var vl_new = voicelines.filter(function(vl) {
        for(var i = 0; i < _this.class_filters.length; i++) {
          if(vl.cls == _this.class_filters[i].name) { // If this class is the class of the voiceline
            if(_this.class_filters[i].val == true) { // If this class is to be filtered out
              if(search == "" || vl.text.toUpperCase().includes(search)) {
                return true;
              } else {
                return false;
              }
            } else {
              return false;
            }
          }
        }
        return false;
      });
      this.searching = false;
      return vl_new;
    }
  },
});

// Load vl file
$.ajax("voicelines.json").done(function(data) {
  app.voicelines = data;
});
