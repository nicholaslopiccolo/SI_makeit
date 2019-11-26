var vue = new Vue({
  el: '#vue',
  data: {
    date_options: {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    },
    feeds: []
  },
  created: function () {
    //switch statments
    this.getFeeds();
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
    deleteRow: function (feed) {
      let self = this;
      if (confirm("Sei sicuro di voler eliminare il commento?")) {
        axios.post('/delete',{'Id': feed.Id}).then(msg=>{
          self.getFeeds()
          console.log('Deleted: ');
          console.log(msg);
        });
      }
    }
  }
});