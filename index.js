var app = new Vue({
  el: "#app",
  data: {
    voicelines: [],
    filtered_voicelines: [],
    search: "",
    searching: false,
    last_call: -1,
    current_index: 0,
    class_filters: [
      {id: "scout", name: "Scout", val: false},
      {id: "soldier", name: "Soldier", val: true},
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
    "search": function() {
      this.start_filter();
    },
  },
  methods: {
    play: function(link) {
      var audio = document.getElementById("audio-container");
      audio.innerHTML = "<audio autoplay><source src=\"" + link + "\"></source></audio>";
    },
    start_filter: function() {
      console.log("Start search");
      var _this = this;
      var search = this.search.toUpperCase();
      // Empty list
      this.filtered_voicelines.splice(0);
      _this.current_index = 0;
      if(_this.last_call != -1) {
        console.log("cancelling previous search")
        cancelAnimationFrame(_this.last_call);
        _this.last_call = -1;
      }
      var BATCH_SIZE = 200;
      // Refill it async
      function do_filter() {
        console.log(_this.current_index);
        for(var a = 0; a < BATCH_SIZE; a++) {
          if((_this.current_index + a) >= _this.voicelines.length) {
            continue
          }
          var vl = _this.voicelines[_this.current_index + a];
          for(var i = 0; i < _this.class_filters.length; i++) {
            if(vl.cls == _this.class_filters[i].name) { // If this class is the class of the voiceline
              if(_this.class_filters[i].val == true) { // If this class is to be filtered out
                if(search == "" || vl.text.toUpperCase().includes(search)) {
                  _this.filtered_voicelines.push(vl);
                }
              }
            }
          }
        }

        _this.current_index += BATCH_SIZE;
        if(_this.current_index < _this.voicelines.length) {
          _this.last_call = requestAnimationFrame(do_filter);
        } else {
          console.log("Done")
        }
      }

      _this.last_call = requestAnimationFrame(do_filter);
    }
  },
});

// Load vl file
$.ajax("voicelines.json").done(function(data) {
  app.voicelines = data;
  app.start_filter();
});

var clipboard = new ClipboardJS('.btn');
