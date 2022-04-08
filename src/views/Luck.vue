<template>
  <van-nav-bar title="幸运抽奖" left-arrow @click-left="backCheckin" />
  <div class="goodluck">
    <van-image :src="luck" />
    <van-image class="title" :src="title" />
    <div class="youhuo">Switch、AirPods等大奖等你来拿</div>
    <div class="sub-title">
      <div class="ks">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="lottery-icon"
          data-v-2118ecfa=""
        >
          <g filter="url(#filter0_d_7401_115365)" data-v-2118ecfa="">
            <path
              d="M15.5001 7.63319L10.7001 8.30519L8.30008 13.3452L8.96008 15.0557L10.4001 16.3692L11.9001 17.0412L14.3001 18.7212L18.5001 20.4012L21.6878 17.7913C21.839 17.6676 21.9486 17.5004 22.0018 17.3124L23.4114 12.3317C23.5333 11.9011 23.5001 11.4413 23.3177 11.0327L20.9001 5.61719L15.5001 7.63319Z"
              fill="#FFCF8B"
              data-v-2118ecfa=""
            ></path>
            <path
              d="M15.5001 7.63356L11.1201 8.69247L9.50009 6.96156L10.1001 3.60156L19.7001 3.93756L20.9001 5.61756L19.5201 6.65611L15.5001 7.63356Z"
              fill="#FFE3C5"
              data-v-2118ecfa=""
            ></path>
            <path
              d="M6.20007 8.30556L10.1001 3.60156L9.50007 6.96156L11.1201 8.69247L9.44007 12.5107L6.20007 8.30556Z"
              fill="#FF9A2E"
              data-v-2118ecfa=""
            ></path>
            <path
              d="M9.44009 12.5098L6.20009 8.30469L4.40009 15.3607L7.04009 16.328L9.44009 14.8007V12.5098Z"
              fill="#FF9A2E"
              data-v-2118ecfa=""
            ></path>
            <path
              d="M7.04009 16.3281L4.40009 15.3608L6.32009 18.1099L8.00009 19.6371L18.5001 20.4008L9.44009 14.8008L7.04009 16.3281Z"
              fill="#ED842C"
              data-v-2118ecfa=""
            ></path>
          </g>
          <defs data-v-2118ecfa="">
            <filter
              id="filter0_d_7401_115365"
              x="0.400085"
              y="1.60156"
              width="27.0836"
              height="24.7988"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
              data-v-2118ecfa=""
            >
              <feFlood
                flood-opacity="0"
                result="BackgroundImageFix"
                data-v-2118ecfa=""
              ></feFlood>
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
                data-v-2118ecfa=""
              ></feColorMatrix>
              <feOffset dy="2" data-v-2118ecfa=""></feOffset>
              <feGaussianBlur
                stdDeviation="2"
                data-v-2118ecfa=""
              ></feGaussianBlur>
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"
                data-v-2118ecfa=""
              ></feColorMatrix>
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_7401_115365"
                data-v-2118ecfa=""
              ></feBlend>
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_7401_115365"
                result="shape"
                data-v-2118ecfa=""
              ></feBlend>
            </filter>
          </defs>
        </svg>
        <div class="count">{{ currentPoint }}</div>
      </div>
      <div class="rules">
        <div @click="showLuckRules">
          <van-icon name="question" style="margin-right: 8px" />抽奖规则
        </div>
        <div>
          <van-icon name="goods-collect" style="margin-right: 8px" />我的收获
        </div>
      </div>
    </div>
    <div class="lottery">
      <div class="turnable-wrap">
        <div class="turnable-box">
          <div class="upper-border up-down">
            <div class="dot vertex"></div>
            <div class="dot border left-border-dot"></div>
            <div class="dot white"></div>
            <div class="dot border right-border-dot"></div>
            <div class="dot vertex"></div>
          </div>
          <div class="lower-border up-down">
            <div class="dot vertex"></div>
            <div class="dot border left-border-dot"></div>
            <div class="dot white"></div>
            <div class="dot border right-border-dot"></div>
            <div class="dot vertex"></div>
          </div>
          <div class="left-border left-right">
            <div class="dot vertex"></div>
            <div class="dot border left-border-dot"></div>
            <div class="dot white"></div>
            <div class="dot border right-border-dot"></div>
            <div class="dot vertex"></div>
          </div>
          <div class="right-border left-right">
            <div class="dot vertex"></div>
            <div class="dot border left-border-dot"></div>
            <div class="dot white"></div>
            <div class="dot border right-border-dot"></div>
            <div class="dot vertex"></div>
          </div>
          <div class="blocks">
            <div class="item-container">
              <div
                v-for="item in lottery"
                :key="item.lottery_id"
                class="turntable-item item"
                :locked="item.unlock_count"
              >
                <div v-if="item.unlock_count > 0" class="locked"></div>
                <div class="image">
                  <img :src="item.lottery_image" alt="image" />
                </div>
                <div class="text">
                  {{
                    item.unlock_count > 0
                      ? `再抽${item.unlock_count}次解锁`
                      : item.lottery_name
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="cost-box" class="cost-box">
          <div id="turntable-item-0" class="turntable-item lottery">
            <div v-if="freeCount > 0" class="lottery-text" @click="draw(0)">
              免抽一次
            </div>
            <div v-else>
              <div class="lottery-text" @click="draw(1)">单抽</div>
              <div class="icon-num-box">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="lottery-icon"
                  data-v-18947155=""
                >
                  <g filter="url(#filter0_d_7401_115365)" data-v-18947155="">
                    <path
                      d="M15.5001 7.63319L10.7001 8.30519L8.30008 13.3452L8.96008 15.0557L10.4001 16.3692L11.9001 17.0412L14.3001 18.7212L18.5001 20.4012L21.6878 17.7913C21.839 17.6676 21.9486 17.5004 22.0018 17.3124L23.4114 12.3317C23.5333 11.9011 23.5001 11.4413 23.3177 11.0327L20.9001 5.61719L15.5001 7.63319Z"
                      fill="#FFCF8B"
                      data-v-18947155=""
                    ></path>
                    <path
                      d="M15.5001 7.63356L11.1201 8.69247L9.50009 6.96156L10.1001 3.60156L19.7001 3.93756L20.9001 5.61756L19.5201 6.65611L15.5001 7.63356Z"
                      fill="#FFE3C5"
                      data-v-18947155=""
                    ></path>
                    <path
                      d="M6.20007 8.30556L10.1001 3.60156L9.50007 6.96156L11.1201 8.69247L9.44007 12.5107L6.20007 8.30556Z"
                      fill="#FF9A2E"
                      data-v-18947155=""
                    ></path>
                    <path
                      d="M9.44009 12.5098L6.20009 8.30469L4.40009 15.3607L7.04009 16.328L9.44009 14.8007V12.5098Z"
                      fill="#FF9A2E"
                      data-v-18947155=""
                    ></path>
                    <path
                      d="M7.04009 16.3281L4.40009 15.3608L6.32009 18.1099L8.00009 19.6371L18.5001 20.4008L9.44009 14.8008L7.04009 16.3281Z"
                      fill="#ED842C"
                      data-v-18947155=""
                    ></path>
                  </g>
                  <defs data-v-18947155="">
                    <filter
                      id="filter0_d_7401_115365"
                      x="0.400085"
                      y="1.60156"
                      width="27.0836"
                      height="24.7988"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                      data-v-18947155=""
                    >
                      <feFlood
                        flood-opacity="0"
                        result="BackgroundImageFix"
                        data-v-18947155=""
                      ></feFlood>
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                        data-v-18947155=""
                      ></feColorMatrix>
                      <feOffset dy="2" data-v-18947155=""></feOffset>
                      <feGaussianBlur
                        stdDeviation="2"
                        data-v-18947155=""
                      ></feGaussianBlur>
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"
                        data-v-18947155=""
                      ></feColorMatrix>
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_7401_115365"
                        data-v-18947155=""
                      ></feBlend>
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_7401_115365"
                        result="shape"
                        data-v-18947155=""
                      ></feBlend>
                    </filter>
                  </defs>
                </svg>
                <div class="text">200</div>
              </div>
            </div>
          </div>
          <div id="turntable-item-1" class="turntable-item lottery">
            <div class="lottery-text" @click="draw(10)">十连抽</div>
            <div class="icon-num-box">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="lottery-icon"
                data-v-18947155=""
              >
                <g filter="url(#filter0_d_7401_115365)" data-v-18947155="">
                  <path
                    d="M15.5001 7.63319L10.7001 8.30519L8.30008 13.3452L8.96008 15.0557L10.4001 16.3692L11.9001 17.0412L14.3001 18.7212L18.5001 20.4012L21.6878 17.7913C21.839 17.6676 21.9486 17.5004 22.0018 17.3124L23.4114 12.3317C23.5333 11.9011 23.5001 11.4413 23.3177 11.0327L20.9001 5.61719L15.5001 7.63319Z"
                    fill="#FFCF8B"
                    data-v-18947155=""
                  ></path>
                  <path
                    d="M15.5001 7.63356L11.1201 8.69247L9.50009 6.96156L10.1001 3.60156L19.7001 3.93756L20.9001 5.61756L19.5201 6.65611L15.5001 7.63356Z"
                    fill="#FFE3C5"
                    data-v-18947155=""
                  ></path>
                  <path
                    d="M6.20007 8.30556L10.1001 3.60156L9.50007 6.96156L11.1201 8.69247L9.44007 12.5107L6.20007 8.30556Z"
                    fill="#FF9A2E"
                    data-v-18947155=""
                  ></path>
                  <path
                    d="M9.44009 12.5098L6.20009 8.30469L4.40009 15.3607L7.04009 16.328L9.44009 14.8007V12.5098Z"
                    fill="#FF9A2E"
                    data-v-18947155=""
                  ></path>
                  <path
                    d="M7.04009 16.3281L4.40009 15.3608L6.32009 18.1099L8.00009 19.6371L18.5001 20.4008L9.44009 14.8008L7.04009 16.3281Z"
                    fill="#ED842C"
                    data-v-18947155=""
                  ></path>
                </g>
                <defs data-v-18947155="">
                  <filter
                    id="filter0_d_7401_115365"
                    x="0.400085"
                    y="1.60156"
                    width="27.0836"
                    height="24.7988"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                    data-v-18947155=""
                  >
                    <feFlood
                      flood-opacity="0"
                      result="BackgroundImageFix"
                      data-v-18947155=""
                    ></feFlood>
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                      data-v-18947155=""
                    ></feColorMatrix>
                    <feOffset dy="2" data-v-18947155=""></feOffset>
                    <feGaussianBlur
                      stdDeviation="2"
                      data-v-18947155=""
                    ></feGaussianBlur>
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"
                      data-v-18947155=""
                    ></feColorMatrix>
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_7401_115365"
                      data-v-18947155=""
                    ></feBlend>
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_7401_115365"
                      result="shape"
                      data-v-18947155=""
                    ></feBlend>
                  </filter>
                </defs>
              </svg>
              <div class="text">2000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div style="background-color: #2c68ff; height: 1500px">
    <div id="progress-guide-box" class="lucky-wrap lucky-progress-wrap">
      <div id="progress-wrap" class="progress-wrap">
        <span class="title">幸运值</span>
        <div class="progress-box">
          <div class="progress">
            <div
              class="progress-icon"
              :style="{ width: procress }"
              style="min-width: 4px"
            ></div>
            <span class="tooltip" style="right: 39.43%">
              <div
                class="byte-tooltip byte-tooltip--dark"
                style="
                  display: none;
                  position: absolute;
                  max-width: none;
                  will-change: transform;
                  z-index: 1039;
                  top: 0px;
                  left: 0px;
                  transform: translate3d(167px, 26px, 0px);
                "
                x-placement="bottom"
              >
                本次沾喜气增加幸运值10，当前幸运值为{{ luckValue }}
                <div x-arrow="" class="popper__arrow" style="left: 0px"></div>
              </div>
              <span class="byte-tooltip__wrapper"
                ><span class="tooltip-block"></span></span
            ></span>
          </div>
        </div>
        <div class="value-wrap">
          <span class="current-value">{{ luckValue }}</span>
          <span>/6000</span>
        </div>
      </div>
      <div class="desc">
        * 抽奖和沾喜气可提升幸运值，幸运值满格必出转盘内实物奖励
      </div>
    </div>
    <div>
      <p id="lottery-gifts" class="title">围观大奖</p>
    </div>
    <div
      data-v-40b0fc6f=""
      data-v-2118ecfa=""
      class="grandlottery_container grand_lottery"
    >
      <!---->
      <div data-v-40b0fc6f="" class="wrapper">
        <div
          data-v-40b0fc6f=""
          v-for="item in globalBig"
          :key="item.history_id"
          class="item"
        >
          <div data-v-40b0fc6f="" class="left-box">
            <div data-v-40b0fc6f="" class="image">
              <img data-v-40b0fc6f="" :src="item.lottery_image" />
            </div>
          </div>
          <div data-v-40b0fc6f="" class="right-box">
            <div data-v-40b0fc6f="" class="header-box">
              <span data-v-40b0fc6f="" class="txt">恭喜</span>
              <div data-v-40b0fc6f="" class="user-box">
                <div data-v-40b0fc6f="" class="avatar-box">
                  <img
                    data-v-2a2c158c=""
                    data-v-3aafff8a=""
                    data-v-40b0fc6f=""
                    :src="item.avatar"
                    alt=""
                    class="lazy avatar avatar"
                  />
                </div>
                <span data-v-40b0fc6f="" class="username">{{
                  item.user_name
                }}</span>
              </div>
              <span data-v-40b0fc6f="" class="txt">抽中</span>
              <span data-v-40b0fc6f="" class="grand-name">{{
                item.lottery_name
              }}</span>
            </div>
            <div data-v-40b0fc6f="" class="stick-lucky">
              <div
                data-v-0e386e29=""
                data-v-40b0fc6f=""
                class="stick-lucky-wrap"
              >
                <div data-v-0e386e29="" class="stick-lucky-show">
                  <div data-v-0e386e29="" id="stick-txt-0" class="tooltip-box">
                    <span data-v-0e386e29="" class="tooltip"
                      ><div
                        class="byte-tooltip byte-tooltip--dark"
                        style="display: none"
                      >
                        沾喜气
                      </div>
                      <span class="byte-tooltip__wrapper"
                        ><svg
                          data-v-0e386e29=""
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          class="stick-btn"
                        >
                          <circle
                            data-v-0e386e29=""
                            cx="12"
                            cy="12"
                            r="12"
                            fill="url(#paint0_linear_8874_115135)"
                          ></circle>
                          <circle
                            data-v-0e386e29=""
                            cx="12"
                            cy="12"
                            r="12"
                            fill="url(#paint1_radial_8874_115135)"
                          ></circle>
                          <path
                            data-v-0e386e29=""
                            d="M6 17.7016L8.03219 13.5205L10.1042 14.509L8.03219 18.7031L6 17.7016ZM6.17613 11.6884L7.22727 9.9709L10.1174 11.54L9.06818 13.2575L6.17613 11.6884ZM6.38068 8.33232L7.52651 6.70312L10.4716 8.44882L9.33522 10.1006L6.38068 8.33232ZM10.1174 12.2296H12.4091V6.75574H15.4394V8.86598H18V10.4895H15.4356V12.2221H17.7083V18.2972L10.1117 18.6618L10.1174 12.2296ZM12.9811 16.7752L15.6136 16.653V13.9001H12.9811V16.7752Z"
                            fill="url(#paint2_linear_8874_115135)"
                          ></path>
                          <path
                            data-v-0e386e29=""
                            d="M6 16.6703L8.03219 12.4893L10.1042 13.4777L8.03219 17.6719L6 16.6703ZM6.17613 10.6572L7.22727 8.93965L10.1174 10.5087L9.06818 12.2262L6.17613 10.6572ZM6.38068 7.30107L7.52651 5.67188L10.4716 7.41757L9.33522 9.0693L6.38068 7.30107ZM10.1174 11.1983H12.4091V5.72449H15.4394V7.83473H18V9.45828H15.4356V11.1908H17.7083V17.266L10.1117 17.6305L10.1174 11.1983ZM12.9811 15.7439L15.6136 15.6218V12.8689H12.9811V15.7439Z"
                            fill="#FFF9F0"
                          ></path>
                          <defs data-v-0e386e29="">
                            <linearGradient
                              data-v-0e386e29=""
                              id="paint0_linear_8874_115135"
                              x1="5.5"
                              y1="-3.09199e-07"
                              x2="19"
                              y2="24"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop
                                data-v-0e386e29=""
                                stop-color="#FF8D4D"
                              ></stop>
                              <stop
                                data-v-0e386e29=""
                                offset="1"
                                stop-color="#F26426"
                              ></stop>
                            </linearGradient>
                            <radialGradient
                              data-v-0e386e29=""
                              id="paint1_radial_8874_115135"
                              cx="0"
                              cy="0"
                              r="1"
                              gradientUnits="userSpaceOnUse"
                              gradientTransform="translate(8.59375 6.875) rotate(58.6828) scale(17.3753)"
                            >
                              <stop
                                data-v-0e386e29=""
                                stop-color="#FFB84D"
                                stop-opacity="0.73"
                              ></stop>
                              <stop
                                data-v-0e386e29=""
                                offset="0.570433"
                                stop-color="#FA973E"
                                stop-opacity="0.5"
                              ></stop>
                              <stop
                                data-v-0e386e29=""
                                offset="1"
                                stop-color="#F26426"
                                stop-opacity="0"
                              ></stop>
                            </radialGradient>
                            <linearGradient
                              data-v-0e386e29=""
                              id="paint2_linear_8874_115135"
                              x1="15.75"
                              y1="17.875"
                              x2="12"
                              y2="4.75"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop
                                data-v-0e386e29=""
                                stop-color="#C64D16"
                              ></stop>
                              <stop
                                data-v-0e386e29=""
                                offset="0.521882"
                                stop-color="#C64D16"
                                stop-opacity="0.611765"
                              ></stop>
                              <stop
                                data-v-0e386e29=""
                                offset="1"
                                stop-color="#C64D16"
                                stop-opacity="0"
                              ></stop>
                            </linearGradient>
                          </defs></svg></span
                    ></span>
                  </div>
                  <span data-v-0e386e29="" class="divide"></span>
                  <span data-v-0e386e29="" class="user-list">{{
                    luckUsers(item.dip_lucky_users)
                  }}</span>
                  <span data-v-0e386e29="" class="num">
                    {{ item.dip_lucky_user_count }}
                  </span>
                  <span data-v-0e386e29="" class="unit">人</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div data-v-40b0fc6f="" class="pagantion-box">
          <div data-v-6d18e831="" data-v-40b0fc6f="" class="pagenation-wrap">
            <div data-v-6d18e831="" class="arrow-box">
              <svg
                data-v-6d18e831=""
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="arrow-icon-disabled arrow-icon arrow-icon-left"
              >
                <path
                  data-v-6d18e831=""
                  d="M4.10207 3.1582C3.90681 3.35347 3.90681 3.67005 4.10207 3.86531L6.28214 6.04538L4.16456 8.16296C3.9693 8.35823 3.9693 8.67481 4.16456 8.87007L4.51811 9.22362C4.71337 9.41889 5.02996 9.41889 5.22522 9.22362L8.05365 6.3952C8.24891 6.19993 8.24891 5.88335 8.05365 5.68809L7.70009 5.33454C7.68257 5.31702 7.66408 5.30107 7.64478 5.28669L5.16273 2.80465C4.96747 2.60939 4.65089 2.60939 4.45563 2.80465L4.10207 3.1582Z"
                  fill="#E8F3FF"
                ></path>
              </svg>
            </div>
            <div
              data-v-6d18e831=""
              class="page-code page-code-active"
              @click="setPage(1)"
            >
              1
            </div>
            <div data-v-6d18e831="" class="page-code" @click="setPage(2)">
              2
            </div>
            <div data-v-6d18e831="" class="page-code" @click="setPage(3)">
              3
            </div>
            <div data-v-6d18e831="" class="page-code" @click="setPage(4)">
              4
            </div>
            <div data-v-6d18e831="" class="page-code" @click="setPage(5)">
              5
            </div>
            <div data-v-6d18e831="" class="arrow-box arrow-box-right">
              <svg
                data-v-6d18e831=""
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="arrow-icon"
              >
                <path
                  data-v-6d18e831=""
                  d="M4.10207 3.1582C3.90681 3.35347 3.90681 3.67005 4.10207 3.86531L6.28214 6.04538L4.16456 8.16296C3.9693 8.35823 3.9693 8.67481 4.16456 8.87007L4.51811 9.22362C4.71337 9.41889 5.02996 9.41889 5.22522 9.22362L8.05365 6.3952C8.24891 6.19993 8.24891 5.88335 8.05365 5.68809L7.70009 5.33454C7.68257 5.31702 7.66408 5.30107 7.64478 5.28669L5.16273 2.80465C4.96747 2.60939 4.65089 2.60939 4.45563 2.80465L4.10207 3.1582Z"
                  fill="#E8F3FF"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <p class="title">中奖播报</p>
    </div>
    <div
      class="winninglist_container winning_list"
      data-v-033635d2=""
      data-v-2118ecfa=""
    >
      <div class="content" :style="{ transform: translate }" data-v-033635d2="">
        <div
          data-v-033635d2=""
          class="item"
          v-for="item in globalSmall"
          :key="item.historyid"
        >
          <p data-v-033635d2="" class="message">
            🎉
            <span data-v-033635d2="" class="txt">恭喜</span>
            <span data-v-033635d2="" class="username">{{
              item.user_name
            }}</span>
            <span data-v-033635d2="" class="txt"
              >抽中{{ item.lottery_name }}</span
            >
          </p>
          <p data-v-033635d2="" class="date">
            {{ lotteryDate(item.date) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import luck from "../assets/images/goodluck_background.png";
import title from "../assets/images/title-luck.png";
import { useRouter } from "vue-router";
import { computed, reactive, toRefs } from "vue";
import api from "../api/juejinapi";
import { Dialog } from "vant";
import utils from "../utils/utils";
export default {
  setup() {
    const state = reactive({
      currentPoint: 0,
      lottery: [],
      freeCount: 0,
      ruleText: "",
      luckValue: 0,
      globalBig: [],
      globalSmall: [],
      translate: "translateY(-1px)",
    });
    const router = useRouter();
    const backCheckin = function () {
      router.push("/checkin");
    };
    api.getPoint().then((res) => {
      state.currentPoint = res.data;
    });

    api.getLuck().then((res) => {
      state.lottery = res.data.lottery;
      state.freeCount = res.data.free_count;
    });

    api.getLuckRules().then((res) => {
      res.data.forEach((element) => {
        state.ruleText += element.text_bold + element.text_plain;
      });
    });

    api.myLuck().then((res) => {
      state.luckValue = res.data.total_value;
    });

    const procress = computed(() => {
      return (state.luckValue / 6000) * 100 + "%";
    });

    api.globalSmall().then((res) => {
      state.globalSmall = res.data.lotteries;
    });

    const lotteryDate = function (date) {
      let ldate = new Date(utils.getLocalTime(date));
      ldate = new Date(ldate);
      return `${ldate.getFullYear()}-${
        ldate.getMonth() + 1
      }-${ldate.getDate()}`;
    };

    let tran = 0;
    setInterval(() => {
      tran--;
      state.translate = `translateY(${tran}px)`;
      if (tran <= -500) {
        tran = -1;
      }
    }, 30);

    const luckUsers = function (users) {
      let userNames = [];
      users.forEach((item) => {
        userNames.push(item.user_name);
      });
      return userNames.join("、");
    };

    const setPage = function (pageNo) {
      const pages = document.querySelectorAll(".page-code");
      pages.forEach((el) => {
        el.className = "page-code";
      });
      if (pages.length > 0) {
        pages[pageNo - 1].className = "page-code page-code-active";
      }

      api.globalBig(pageNo, 5).then((res) => {
        state.globalBig = res.data.lotteries;
      });
    };
    setPage(1);
    const showLuckRules = function () {
      Dialog.alert({
        title: "抽奖规则",
        message: state.ruleText,
        theme: "round-button",
        confirmButtonText: "关闭",
        messageAlign: "left",
      }).then(() => {
        // on close
      });
    };

    const showResult = function (title, message) {
      Dialog.alert({
        title: title,
        allowHtml: true,
        message: message,
        theme: "round-button",
        confirmButtonText: "收下奖励",
        messageAlign: "left",
      }).then(() => {
        api.getLuck().then((res) => {
          state.lottery = res.data.lottery;
          state.freeCount = res.data.free_count;
        });
        api.getPoint().then((res) => {
          state.currentPoint = res.data;
        });
      });
    };
    let items = [];
    const recoveryBg = function () {
      items.forEach((el) => {
        el.className = "turntable-item item";
      });
    };
    const animate = function () {
      items = document.querySelectorAll(".turntable-item.item");
      let counter = 0;
      let interval = setInterval(() => {
        recoveryBg();
        let locked = items[counter].getAttribute("locked");
        if (locked == 0) {
          //跳过未解锁的奖品
          items[counter].className = "turntable-item item chosen";
        }
        counter++;
        if (counter === items.length) {
          counter = 0;
        }
      }, 100);
      return interval;
    };
    const draw = function (type) {
      if (type === 0) {
        //免抽一次
        let interval = animate();
        api.drawFree().then((res) => {
          clearInterval(interval);
          const title = `恭喜抽中${res.data.lottery_name}`;
          const message = `<div><img src="${res.data.lottery_image}" alt="image" /></div>;`;
          showResult(title, message);
          recoveryBg();
        });
      } else if (type === 1) {
        //单抽消耗200矿石
        let interval = animate();
        api.draw1().then((res) => {
          clearInterval(interval);
          const title = `恭喜抽中${res.data.lottery_name}`;
          const message = `<div><img src="${res.data.lottery_image}" alt="image" /></div>;`;
          showResult(title, message);
          recoveryBg();
        });
      } else if (type === 10) {
        //十连抽
        let interval = animate();
        api.tenDraw().then((res) => {
          clearInterval(interval);
          let message = '<div class="gifts">';
          console.log(res);
          res.data.LotteryBases.forEach((item) => {
            message += `<div class="gift"><img src="${item.lottery_image}" class="gift-img">
              <p class="gift-name">${item.lottery_name}</p>
          </div>`;
          });
          message += "</div>";
          showResult("十连抽奖励", message);
          recoveryBg();
        });
      }
    };

    return {
      ...toRefs(state),
      luck,
      title,
      backCheckin,
      showLuckRules,
      draw,
      procress,
      luckUsers,
      setPage,
      lotteryDate,
    };
  },
};
</script>

<style lang="less">
.goodluck {
  position: relative;
  background-color: #2c68ff;
  width: 100%;
  height: 800px;
  & .title {
    position: absolute;
    margin-top: -320px;
    display: block;
  }
  & .youhuo {
    position: absolute;
    color: #fff;
    font-size: 16px;
    text-align: center;
    margin-top: -270px;
    margin-left: 100px;
  }
  & .sub-title {
    width: 100%;
    position: absolute;
    margin-top: -230px;
    & .rules {
      float: right;
      margin-right: 10px;
      color: #fff;
    }
    & .ks {
      width: 120px;
      float: left;
      font-size: 14px;
      color: #faf1be;
      margin-left: 10px;
      border-radius: 15px;
      background-color: rgba(30, 128, 255, 0.8);
      padding-left: 10px;
      padding-right: 10px;
      & .count {
        font-weight: bold;
        position: absolute;
        display: inline-block;
        margin-top: 6px;
      }
    }
  }
  & .lottery {
    position: absolute;
    margin-top: -155px;
    width: 100%;
    // height: 100%;
    background: #fadd95;
    box-shadow: inset 0 0 16px #ff9a2e;
    border-radius: 12px;
    box-sizing: border-box;
    & .turnable-wrap {
      width: 100%;
      height: 100%;
      background: #fadd95;
      box-shadow: inset 0 0 16px #ff9a2e;
      border-radius: 12px;
      box-sizing: border-box;
      & .turnable-box {
        height: 348px;
        position: relative;
        padding: 20px;

        & .upper-border {
          top: 0;
        }

        & .lower-border {
          bottom: 0;
        }
        & .left-border {
          left: 0;
          & .vertex {
            visibility: hidden;
          }
        }
        & .right-border {
          right: 0;
          & .vertex {
            visibility: hidden;
          }
        }
        .left-right {
          width: 20px;
          position: absolute;
          top: 8px;
          display: flex;
          align-items: center;
          height: calc(100% - 16px);
          justify-content: space-between;
          flex-direction: column;
        }
        & .up-down {
          position: absolute;
          left: 8px;
          display: flex;
          align-items: center;
          height: 24px;
          width: calc(100% - 16px);
          justify-content: space-between;

          & .left-border-dot {
            transform: translateX(-100%);
          }
          & .right-border-dot {
            transform: translateX(100%);
          }
        }
        & .border {
          border: 1.5px solid #fff7e8;
        }
        & .white {
          background: #fff7e8;
        }

        & .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          box-sizing: border-box;
        }

        & .vertex {
          background: #e37815;
        }
        & .blocks {
          width: 100%;
          height: 100%;
          & .item-container {
            width: 100%;
            height: 100%;
            background: #e37815;
            border-radius: 8px;
            padding: 16px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            flex-direction: row;
            align-content: space-between;
            & .item {
              width: calc(33.33333% - 5.33333px);
              height: calc(33.33333% - 9.33333px);
            }

            & .turntable-item {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              background: #fdf3f3;
              border-radius: 4px;
              position: relative;
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
              & .image {
                height: 50px;
                width: 72px;
                display: flex;
                justify-content: center;
                align-items: center;
                & img {
                  width: 40px;
                  height: 40px;
                }
              }
              & .text {
                font-size: 14px;
                font-weight: 400;
                line-height: 22px;
                color: #d25f00;
                max-width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
            & .chosen {
              background: #ffcf8b;
            }
          }
        }
      }
    }
  }
}
.locked {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fdf3f3;
  opacity: 0.7;
}
.cost-box {
  margin-top: 105px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px 28px;
  & .lottery {
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 37vw;
    height: 64px;
    box-sizing: border-box;
    padding: 8px 0;
    background: linear-gradient(180deg, #ffb46f 15.1%, #ef7d13);
    box-shadow: 0 8px 0 #d25f00;
    & .lottery-text {
      font-size: 18px;
      color: #fff;
      line-height: 18px;
      margin-top: 4px;
    }
    & .icon-num-box {
      height: 24px;
      margin-top: 2px;
    }
    & .text {
      font-size: 14px;
      color: #faf1be;
      line-height: 24px;
    }
  }
  & .turntable-item {
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 170px;
    height: 64px;
    border-radius: 16px;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    transition: box-shadow;
    & .icon-num-box {
      display: flex;
      align-items: center;
    }
    & .text {
      font-size: 20px;
      color: #faf1be;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 500;
      line-height: 32px;
      max-width: 100%;
    }
  }
}

.gifts {
  padding: 24px 0 31px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: -24px;
  & .gift {
    width: 112px;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
  }

  & .gift-img {
    width: 72px;
    height: 72px;
  }

  & .gift-name {
    padding: 0;
    width: 96px;
    height: 24px;
    font-size: 14px;
    color: #515767;
    line-height: 24px;
    margin: 12px 0 0;
    text-align: center;
  }
}
.lucky-wrap {
  padding: 0 24px;
  & .progress-wrap {
    display: flex;
    align-items: center;
  }
  & .title {
    font-size: 16px;
    font-weight: 500;
    color: #ffcc76;
  }
  & .progress-box {
    flex: 1;
    height: 24px;
    box-sizing: border-box;
    background: hsla(0, 0%, 77.3%, 0.72);
    border-radius: 50px;
    margin: 0 12px;
    padding: 0 4px;
  }
  & .progress {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: relative;
  }
  & .progress-icon {
    overflow: hidden;
    border-radius: 50px;
    width: 100%;
    height: 80%;
    margin-top: 2px;
    transition: width 0.3s linear;
    background: url(//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/progressIcon.af62c73.png)
      no-repeat;
    background-size: cover;
  }
  & .tooltip {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 15;
    & .byte-tooltip {
      width: 200px;
      padding: 8px 12px;
      background: linear-gradient(0deg, #fff3d6 28.13%, #fff);
      border-radius: 8px;
      opacity: 1;
      box-sizing: border-box;
      color: #934200;
      line-height: 22px;
      box-shadow: none;
      outline: none;
      & .popper__arrow {
        background-color: #fff;
      }
    }
    & .tooltip-block {
      display: block;
      height: 13px;
    }
  }
  & .value-wrap {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    font-size: 16px;
    color: #8a919f;
  }
  & .current-value {
    color: #ffcc76;
  }
  & .desc {
    font-size: 14px;
    color: #ffe5a6;
    line-height: 22px;
    margin-top: 16px;
  }
}
.lucky-progress-wrap {
  // margin-top: 390px;
  //   position: absolute;
}
.byte-tooltip[x-placement^="bottom"] {
  margin-top: 10px;
}
div.byte-tooltip--dark {
  background: #000;
  opacity: 0.8;
  box-shadow: 0 4px 8px rgb(0 0 0 / 16%);
}

#lottery-gifts {
  position: relative;
  padding-left: 20px;
  font-size: 20px;
  line-height: 28px;
  color: #fadd95;
  margin-top: 10px;
}

& .grand_lottery[data-v-2118ecfa] {
  width: 100%;
  margin-top: 18px;
  margin-bottom: 24px;
  background: rgba(255, 247, 232, 0.16);
  box-shadow: inset 0 0 20px rgb(255 247 232 / 40%);
  border-radius: 12px;
  padding: 24px 20px;
  box-sizing: border-box;
}
.grandlottery_container {
  & .wrapper {
    & .item[data-v-40b0fc6f] {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      & .left-box[data-v-40b0fc6f] {
        margin-right: 16px;
        flex: 0 0 auto;
        & .image {
          width: 56px;
          height: 56px;
          & img[data-v-40b0fc6f] {
            max-width: 100%;
            max-height: 100%;
          }
        }
      }

      & .right-box[data-v-40b0fc6f] {
        flex: 1;
      }
      & .header-box[data-v-40b0fc6f] {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #fff;

        & .txt[data-v-40b0fc6f] {
          flex: 0 0 auto;
          margin-right: 4px;
        }
        & .user-box[data-v-40b0fc6f] {
          display: flex;
          align-items: center;
          overflow: hidden;
          transition: all 0.3s linear;
          & .avatar-box[data-v-40b0fc6f] {
            width: 20px;
            height: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 0.5px solid transparent;
            box-sizing: border-box;
            border-radius: 50%;
          }
          & .avatar[data-v-40b0fc6f] {
            width: 16px;
            height: 16px;
            border-radius: 50%;
          }
          & .username[data-v-40b0fc6f] {
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #fff;
            overflow: hidden;
            margin-left: 4px;
            margin-right: 4px;
          }
        }
        & .grand-name[data-v-40b0fc6f] {
          flex: 0 0 auto;
          color: #fadd95;
        }
      }
      & .stick-lucky[data-v-40b0fc6f] {
        margin-top: 8px;
      }
    }
  }
  & .pagantion-box[data-v-40b0fc6f] {
    display: flex;
    justify-content: center;
    padding-left: 0;
  }
}
.pagenation-wrap {
  display: flex;
  align-items: center;
  & .arrow-box[data-v-6d18e831] {
    display: flex;
    align-items: center;
  }
  & .arrow-box[data-v-6d18e831] {
    width: 28px;
    height: 28px;
    font-weight: 700;
    justify-content: center;
  }
  & .page-code-active[data-v-6d18e831] {
    background: #1a54ef;
    color: #fff;
    font-weight: 700;
  }
  & .page-code[data-v-6d18e831] {
    width: 28px;
    height: 28px;
    line-height: 28px;
    font-size: 13px;
    width: 24px;
    height: 24px;
    font-size: 12px;
    color: #e8f3ff;
    line-height: 24px;
    text-align: center;
    // background: hsla(0, 0%, 100%, 0.12);
    border-radius: 50%;
    margin-left: 16px;
    transition: all 0.3s linear;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  & .arrow-box-right[data-v-6d18e831] {
    margin-left: 16px;
  }
  & .arrow-icon[data-v-6d18e831] {
    width: 12px;
    height: 12px;
  }
  & .arrow-icon-left[data-v-6d18e831] {
    transform: rotate(180deg);
    width: 12px;
    height: 12px;
  }
}
.stick-lucky-wrap {
  & .stick-lucky-show[data-v-0e386e29] {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #b2d0fc;
    background: rgba(30, 79, 228, 0.6);
    border-radius: 50px;
    padding: 0 8px;
    box-sizing: border-box;
    & .tooltip-box[data-v-0e386e29] {
      width: 20px;
      height: 20px;
      flex: 0 0 auto;
    }
    & .tooltip[data-v-0e386e29] {
      width: 20px;
      height: 20px;
      & .byte-tooltip {
        padding: 6px 12px;
      }
    }
    & .stick-btn[data-v-0e386e29] {
      width: 20px;
      height: 20px;
    }
    & .divide[data-v-0e386e29] {
      width: 0;
      height: 12px;
      border-right: 1px solid #5d8eff;
      margin: 0 8px;
    }
    & .user-list[data-v-0e386e29] {
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 42vw;
      margin-right: 4px;
      overflow: hidden;
      flex: 1;
    }
    & .num[data-v-0e386e29] {
      flex: 0 0 auto;
      font-weight: 700;
      color: #fff;
    }
    & .unit[data-v-0e386e29] {
      flex: 0 0 auto;
    }
  }
}
div.byte-tooltip--dark {
  background: #000;
  opacity: 0.8;
  box-shadow: 0 4px 8px rgb(0 0 0 / 16%);
}
div.byte-tooltip {
  padding: 12px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 20px;
}
.byte-tooltip--dark {
  color: #fff;
  background-color: #1d252f;
}
.byte-tooltip {
  padding: 8px 12px;
  border-radius: 2px;
  -webkit-box-shadow: 0 2px 8px 0 rgb(0 0 0 / 15%);
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 15%);
  font-size: 14px;
  font-weight: 400;
}
.lazy[data-v-2a2c158c] {
  position: relative;
  -o-object-fit: cover;
  object-fit: cover;
}
.avatar[data-v-3aafff8a],
.avatar.xmas[data-v-3aafff8a]:after {
  background-position: 50%;
  background-repeat: no-repeat;
}
.avatar[data-v-3aafff8a] {
  display: inline-block;
  position: relative;
  background-size: cover;
  background-color: #eee;
}
img {
  border-style: none;
}
@-webkit-keyframes skeleton-keyframes-data-v-033635d2 {
  0% {
    background-position: 0 0;
  }
  to {
    background-position: 480px 0;
  }
}
@keyframes skeleton-keyframes-data-v-033635d2 {
  0% {
    background-position: 0 0;
  }
  to {
    background-position: 480px 0;
  }
}
.winning_list[data-v-2118ecfa] {
  width: 376px;
  height: 56px;
  margin-top: 18px;
  border-radius: 12px;
  box-sizing: border-box;
  padding: 16px;
  background: rgba(255, 247, 232, 0.16);
  box-shadow: inset 0 0 20px rgb(255 247 232 / 40%);
}
.winninglist_container[data-v-033635d2] {
  box-sizing: border-box;
  overflow: hidden;
  & .item[data-v-033635d2] {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 8px;
    font-size: 14px;
    line-height: 22px;
    color: #fff;
    & p[data-v-033635d2] {
      margin: 0;
    }
    & .message[data-v-033635d2] {
      display: flex;
      align-items: center;
      overflow: hidden;
      flex: 1;
      margin-right: 10px;
    }
    & .date[data-v-033635d2] {
      color: #e8f3ff;
      flex: 0 0 auto;
    }
    & .txt[data-v-033635d2] {
      flex: 0 0 auto;
      padding-left: 5px;
    }
    & .username[data-v-033635d2] {
      color: #fadd95;
      padding-left: 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
    }
  }
}
.title {
  position: relative;
  padding-left: 20px;
  font-size: 20px;
  line-height: 28px;
  color: #fadd95;
  margin: 0;
  & :before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto 0;
    width: 8px;
    height: 20px;
    display: block;
    border-radius: 50px;
    background: #e37815;
  }
}
</style>