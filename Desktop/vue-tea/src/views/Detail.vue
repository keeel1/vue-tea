<template>
  <div class="detail">
    <header>
      <van-icon name="arrow-left" @click="back" />
      <van-icon name="clock" @click="home" />
    </header>
    <Swiper :swiperImg="swiperImg"></Swiper>
    <section>
      <div class="shortname">
        {{ goodsItem.name }}
        <div class="restrict">{{ goodsItem.content }}</div>
      </div>
      <hr />
      <div class="price">
        <div class="new-price">￥{{ goodsItem.price }}</div>
        <div class="weight">/ {{ goodsItem.weight }}</div>
      </div>
      <div class="old-price">
        <div>价格:&nbsp;￥</div>
        <div class="original">
          {{ goodsItem.original }}
        </div>
      </div>
      <hr />
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
        <li>13</li>
        <li>14</li>
        <li>15</li>
        <li>16</li>
        <li>17</li>
        <li>18</li>
        <li>19</li>
        <li>20</li>
        <li>21</li>
        <li>22</li>
        <li>23</li>
        <li>24</li>
        <li>25</li>
        <li>26</li>
        <li>27</li>
        <li>28</li>
        <li>29</li>
        <li>30</li>
        <li>31</li>
        <li>32</li>
        <li>33</li>
        <li>34</li>
        <li>35</li>
        <li>36</li>
        <li>37</li>
        <li>38</li>
        <li>39</li>
        <li>40</li>
        <li>41</li>
        <li>42</li>
        <li>43</li>
        <li>44</li>
        <li>45</li>
        <li>46</li>
        <li>47</li>
        <li>48</li>
        <li>49</li>
        <li>50</li>
        <li>51</li>
        <li>52</li>
        <li>53</li>
        <li>54</li>
        <li>55</li>
        <li>56</li>
        <li>57</li>
        <li>58</li>
        <li>59</li>
        <li>60</li>
        <li>61</li>
        <li>62</li>
        <li>63</li>
        <li>64</li>
        <li>65</li>
        <li>66</li>
        <li>67</li>
        <li>68</li>
        <li>69</li>
        <li>70</li>
        <li>71</li>
        <li>72</li>
        <li>73</li>
        <li>74</li>
        <li>75</li>
        <li>76</li>
        <li>77</li>
        <li>78</li>
        <li>79</li>
        <li>80</li>
        <li>81</li>
        <li>82</li>
        <li>83</li>
        <li>84</li>
        <li>85</li>
        <li>86</li>
        <li>87</li>
        <li>88</li>
        <li>89</li>
        <li>90</li>
        <li>91</li>
        <li>92</li>
        <li>93</li>
        <li>94</li>
        <li>95</li>
        <li>96</li>
        <li>97</li>
        <li>98</li>
        <li>99</li>
        <li>100</li>
      </ul>
    </section>
    <footer>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="cart-o" text="购物车" />
        <van-goods-action-icon icon="star-o" text="收藏" />
        <van-goods-action-button
          type="warning"
          text="加入购物车"
          @click="addStoreToCart"
        />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </footer>
  </div>
</template>

<script>
import Swiper from "@/components/common/Swiper.vue";
import { getGoodsDetail, addCart } from "@/http/axios";
import { Toast } from "vant";
export default {
  data() {
    return {
      goodsItem: {},
      swiperImg: [],
    };
  },
  components: { Swiper },
  methods: {
    getData() {
      getGoodsDetail({ id: this.$route.query.id }).then((res) => {
        this.goodsItem = res.data[0];
        // 轮播图图片
        if (!this.goodsItem.swiperUrl) return;
        var img = this.goodsItem.swiperUrl.split(";");
        this.swiperImg = img;
      });
    },
    back() {
      this.$router.back();
    },
    home() {
      this.$router.push("/home");
    },
    addStoreToCart() {
      const currentToken = this.$store.state.user.token;
      if (currentToken) {
        addCart({
          name: this.$store.state.user.userInfo.name, //传入用户名称 方便数据库查看
          id: this.$route.query.id, //传入商品id
          token: currentToken,
        }).then((res, err) => {
          setTimeout(() => {
            Toast.success(res.msg);
          }, 500);
        });
      } else {
        this.$router.push("/login");
      }
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped>
.detail {
  display: flex;
  flex-direction: column;
  width: 100vw;
}

.shortname {
  padding: 0.266667rem;
  font-size: 0.533333rem;
}
.shortname .restrict {
  padding: 0.266667rem 0rem;
  font-size: 0.346667rem;
  color: #666;
}

.price {
  padding-left: 0rem 0.266667rem;
  display: flex;
}
.price .new-price {
  margin-left: 0.08rem;
  font-size: 0.8rem;
  color: #d22531;
}
.price .weight {
  padding: 0.453333rem 0.16rem;
  font-size: 0.373333rem;
  color: #666;
}

.old-price {
  padding: 0rem 0.266667rem;
  color: #666;
  display: flex;
  font-size: 0.373333rem;
  margin-bottom: 0.533333rem;
}
.old-price .original {
  margin-top: 0.05rem;
  text-decoration: line-through;
}
hr {
  border: #b5b5b5 0.013333rem dotted;
}
/* footer */
.van-goods-action-icon {
  border-right: 1px solid rgb(225, 225, 225);
}
/* header */
header {
  position: fixed;
  z-index: 999;
}
</style>