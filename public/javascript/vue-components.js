var vue = new Vue({
  el: '#vue',
  data: {
    date_options:{ day: '2-digit', month: '2-digit', year: '2-digit' },
    feeds: [],
    subjects:[],
  },
  created: function () {
    //switch statments
    this.getFeeds();
    this.getSubjects();
  },
  computed: {
  },
  methods: {
    getFeeds: function () {
      var self = this;
      //start spinner
      //get rooms from client db --- to change
      this.feeds.splice(0, this.feeds.length);
      axios.get('/feeds').then(res => {
        res.data.forEach((el, i) => {
          self.feeds.push(el);
        });
      })
    },
    getSubjects: function () {
      var self = this;
      //start spinner
      //get rooms from client db --- to change
      this.subjects.splice(0, this.feeds.length);
      $.ajax({
        url: "/subjects",
        beforeSend: function (xhr) {
          xhr.overrideMimeType("text/plain; charset=x-user-defined");
        }
      }).done(function (data) {
        JSON.parse(data).forEach((el,i)=>{
          self.subjects.push(el);
        });
      });
    },
    formatDT:function(date){
      return 
    }
  }
});