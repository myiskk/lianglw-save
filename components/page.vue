 <template>
   <div class="text-center" v-if="totalPage >1">
    <div>
        <div class="btn-group page-content">
            <button class="btn btn-white" type="button" @click="clickPageBtn('first')"><i class="fa fa-angle-double-left"></i></button>
            <button class="btn btn-white" type="button" @click="clickPageBtn('prev')"><i class="fa fa-angle-left"></i></button>
            <button v-for="i in showPage" class="btn btn-white" :class="{'active':i === pageNow+1}" type="button" @click="clickPageBtn('pageNum',i-1)">{{i}}</button>
            <button class="btn btn-white" type="button" @click="clickPageBtn('next')"><i class="fa fa-angle-right"></i></button>
            <button class="btn btn-white" type="button" @click="clickPageBtn('last')"><i class="fa fa-angle-double-right"></i></button>
            <button v-if="totalPage>5" class="btn btn-white cursor-no" type="button">{{pageNow+1}}/{{totalPage}}</button>
            <template v-if="totalPage>5">
              <input type="text" class="input-page-number" v-model="pageNum" @keyup.enter="selectPage">
              <button class="btn btn-white lastBtn" @click="selectPage">Go</button>
            </template>
        </div>
    </div>
</div>
</template>

<script>
/* eslint-disable no-undef */
  export default {
    name: 'PageBtn',
    props: {
      totalPage: Number,
      pageNow: Number
    },
    data () {
      return {
        pageNum: '',
        innerPageNow: this.pageNow
      }
    },
    computed: {
      showPage: function () { // 根据pageNow的变化改变页码的显示
        return this.pageNumList(this.innerPageNow, this.totalPage)
      }
    },
    methods: {
      // 分页
      pageNumList (n, t) {
        var a = [];
        var num = +n;
        if (t <= 5) {
          for (var i = 1; i <= t; i++) {
            a.push(i)
          }
        } else {
          if (num < 3) {
            a = [1, 2, 3, 4, 5];
          } else if (num >= 3 && num + 2 < t) {
            a = [num - 1, num, num + 1, num + 2, num + 3];
          } else {
            a = [t - 4, t - 3, t - 2, t - 1, t];
          }
        }
        return a;
      },
      clickPageBtn (type, page) {
        let p = this.innerPageNow;
        (type === 'first') && (p = 0);
        (type === 'last') && (p = this.totalPage - 1);
        ((type === 'next') && (parseInt(p) < this.totalPage - 1)) && (p = parseInt(p) + 1);
        ((type === 'prev') && (parseInt(p) > 0)) && (p = parseInt(p) - 1);
        (type === 'pageNum') && (p = page)
        let pageNowChange = this.innerPageNow === p
        this.innerPageNow = p;
        (type !== 'changetotalPage' && !pageNowChange) && this.$emit('get-data', ...[this.innerPageNow])
      },
      selectPage () {
        if (this.pageNum !== '') {
          if (parseInt(this.pageNum) > this.totalPage || parseInt(this.pageNum) < 1 || isNaN(this.pageNum)) {
            global_box.init({
              content: '请输入正确的页码'
            });
          } else {
            let pageNowChange = this.innerPageNow === parseInt(this.pageNum) - 1
            this.innerPageNow = parseInt(this.pageNum) - 1
            this.clickPageBtn()
            !pageNowChange && this.$emit('get-data', ...[this.innerPageNow])
            this.pageNum = ''
          }
        }
      }
    },
    watch: {
      totalPage: function () {
        this.clickPageBtn('changetotalPage')
      },
      innerPageNow: function (val) {
        this.showPage = this.pageNumList(val, this.totalPage)
      }
    }
  }
</script>

<style scoped>
  .btn {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #676a6c;
    padding: 4px 8px;
    font-size: 14px;
    border-radius: 4px;
  }
  .btn.active, .btn:hover{
    background-color: #eee;
    box-shadow: none;
  }
 .input-page-number{
    float: left;
    border: 1px solid #ddd;
    border-left-width: 0;
    border-right-width: 0;
    width: 40px;
    outline: 0;
    padding: 4px 8px;
    height: 30px;
}
.input-page-number:focus {
   border: 1px solid #1ab394;
}
.text-center{
  margin-top: 20px;
}
</style>
