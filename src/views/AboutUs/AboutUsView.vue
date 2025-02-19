<script setup lang="ts">
// 存储从后端获取的文本
const defaultDescription = ref(
  `重庆工商大学人工智能学院“小红帽”常青藤青年志愿者服务队（青队）是一支热情洋溢的志愿团队。其架构清晰，含队长团、部长团及干事层，下设办公室、组织部、宣传部、外联部、网络部及特色公益项目组。各部门协同合作，确保团队工作顺畅。
青队拥有向日葵智力残疾人复托养中心和一天门社区两大基地，为志愿者提供实践舞台。秉承“奉献青春，弘扬志愿”精神，青队积极参与多样志愿服务。其中特色公益项目组含物理、编程、智能科普组及科普宣传组。他们各有职责，如课堂设计、课程计划、智能化开发等，还负责“小老师”培训及活动协调、招募等工作。`
)

const description = ref('')

const teamMembers = ref([
  {
    id: 1,
    name: '向巧',
    role: '指导老师',
    description:
      '向巧老师的简介。向巧老师在教学和志愿服务方面有丰富经验，热心帮助学生成长。',
    photo: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'
  },
  {
    id: 2,
    name: '杨诗瑞',
    role: '正队长',
    description: '杨诗瑞的简介',
    photo: '/src/assets/images/1.jpg'
  },
  {
    id: 3,
    name: '胡敬铃',
    role: '副队长',
    description: '学号：2022413492；分管部门：组织部、网络部；职能：',
    photo: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'
  },
  {
    id: 4,
    name: '彭荟铭',
    role: '副队长',
    description: '彭荟铭的简介',
    photo: '/src/assets/images/3.jpg'
  },
  {
    id: 5,
    name: '甘训荣',
    role: '副队长',
    description: '甘训荣的简介',
    photo: '/src/assets/images/2.jpg'
  },
  {
    id: 6,
    name: '徐昌菊',
    role: '办公室主任',
    description: '徐昌菊的简介',
    photo: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'
  },
  {
    id: 7,
    name: '赵宏博',
    role: '办公室主任',
    description: '赵宏博的简介',
    photo: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'
  },
  {
    id: 8,
    name: '孙盈盈',
    role: '办公室主任',
    description: '孙盈盈的简介',
    photo: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'
  },
  {
    id: 9,
    name: '丁雪晴',
    role: '组织部部长',
    description: '丁雪晴的简介',
    photo: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'
  },
  {
    id: 10,
    name: '覃黔川',
    role: '组织部部长',
    description: '覃黔川的简介',
    photo: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'
  },
  {
    id: 11,
    name: '孟琳佩',
    role: '组织部部长',
    description: '孟琳佩的简介',
    photo: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'
  },
  {
    id: 12,
    name: '焦健雄',
    role: '外联部部长',
    description: '焦健雄的简介',
    photo: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'
  },
  {
    id: 13,
    name: '吴珍屿',
    role: '外联部部长',
    description: '吴珍屿的简介',
    photo: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'
  },
  {
    id: 14,
    name: '周敏',
    role: '外联部部长',
    description: '周敏的简介',
    photo: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'
  },
  {
    id: 15,
    name: '雷兴易',
    role: '网络部部长',
    description: '雷兴易的简介',
    photo: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'
  },
  {
    id: 16,
    name: '彭虹',
    role: '网络部部长',
    description: '彭虹的简介',
    photo: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'
  },
  {
    id: 17,
    name: '叶心语',
    role: '网络部部长',
    description: '叶心语的简介',
    photo: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'
  },
  {
    id: 18,
    name: '王海南',
    role: '新闻中心部长',
    description: '王海南的简介',
    photo: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'
  },
  {
    id: 19,
    name: '陈桥',
    role: '新闻中心部长',
    description: '陈桥的简介',
    photo: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'
  },
  {
    id: 20,
    name: '蔡冰冰',
    role: '新闻中心部长',
    description: '蔡冰冰的简介',
    photo: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'
  },
  {
    id: 21,
    name: '田稳静',
    role: '未来探索公益项目组部长',
    description: '田稳静的简介',
    photo: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'
  },
  {
    id: 22,
    name: '吴凯',
    role: '未来探索公益项目组部长',
    description: '吴凯的简介',
    photo: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'
  }
])

const activeNames = ref<string[]>([]) // 折叠项控制

// 转换换行符为 <p> 标签的函数，并加上缩进
const convertNewlinesToParagraphs = (text: string): string => {
  const paragraphs = text
    .split('\n')
    .map((paragraph) => `<p style="text-indent: 4ch;">${paragraph}</p>`)
    .join('')
  return paragraphs
}

onMounted(() => {
  description.value = convertNewlinesToParagraphs(defaultDescription.value)
})
</script>

<template>
  <div class="about-us-page">
    <!-- 队徽队名部分 -->
    <section class="team-sign">
      <img src="@/assets/images/duiqi.jpg" alt="队旗" class="team-logo" />
    </section>

    <section class="team-details">
      <!-- 团队简介部分 -->
      <section class="team-introduction">
        <van-divider
          content-position="left"
          :style="{ color: '#1989fa', borderColor: '#1989fa' }"
          >青队简介</van-divider
        >
        <!-- 使用 v-html 渲染从后端获取并格式化后的文本 -->
        <div class="description" v-html="description"></div>
      </section>

      <!-- 团队发展历史部分 -->
      <section class="team-history">
        <van-divider
          content-position="left"
          :style="{ color: '#1989fa', borderColor: '#1989fa' }"
          >发展历史</van-divider
        >
        <van-collapse v-model="activeNames">
          <van-collapse-item title="2002年 - 初创与启航" name="1">
            <p>
              2002年，计信义工志愿者协会在一群充满理想与责任感的年轻人手中诞生，标志着志愿服务事业的一次崭新尝试。作为团队的起点，协会的成立为一群志愿者提供了一个组织化的平台，成员们共同分享着服务社会的初心与理想。最初的活动以社区服务为主，旨在为本地居民提供帮助，改善生活质量，逐步在社会上树立了积极向上的形象。
            </p>
          </van-collapse-item>
          <van-collapse-item title="2009年 - 品牌与认同" name="2">
            <p>
              2009年，协会确定了自己的标识——会标与会旗的确立，不仅为团队塑造了独特的形象，也为志愿服务活动的开展提供了标志性符号。这一举措增强了团队成员的归属感，并让外界能够一目了然地识别这一志愿服务团队，标志着组织正式进入更广阔的社会舞台。
            </p>
          </van-collapse-item>
          <van-collapse-item title="2014年 - 品牌重塑与扩展" name="3">
            <p>
              2014年，团队进行了品牌重塑，改名为“常青藤青年志愿者服务队”。新名称象征着团队如常青藤般顽强成长与发展的精神，同时传递出团队更加专业化和多元化的服务理念。改名后的团队更加注重多样化服务领域的拓展，志愿服务的影响力也随之不断扩大。
            </p>
          </van-collapse-item>
          <van-collapse-item title="2015年 - 荣誉与成就" name="4">
            <p>
              2015年，常青藤青年志愿者服务队凭借卓越的志愿服务成绩和社会影响力，荣获了“优秀义工志愿者协会”称号。这一荣誉不仅是对团队多年来坚持不懈奉献精神的肯定，也为后续的发展奠定了坚实的基础。团队成员通过各类形式的公益活动，广泛参与到社会服务中，彰显了青年的责任与担当。
            </p>
          </van-collapse-item>
          <van-collapse-item title="2024年 - 新时代的荣耀" name="5">
            <p>
              2024年，常青藤青年志愿者服务队荣获“优秀青年志愿者服务队”荣誉称号。标志着团队在提升社会服务质量、创新志愿服务形式方面取得的显著成就，也体现了团队成员始终如一的奉献精神与不断前行的动力。
            </p>
          </van-collapse-item>
          <van-collapse-item title="2024年至今 - 持续创新与多元化发展" name="6">
            <p>
              自2022年起，常青藤青年志愿者服务队进入了一个新的发展阶段。团队不仅在传统志愿服务领域持续发力，还通过创新思维推动更多有影响力的社会活动，涵盖了环保、文化传承、教育帮扶等多个领域。通过与各类组织的合作，团队的资源优势得到了充分利用，志愿服务的深度与广度不断拓展。
            </p>
          </van-collapse-item>
        </van-collapse>
      </section>

      <!-- 团队重要成员部分 -->
      <section class="team-members">
        <van-divider
          content-position="left"
          :style="{ color: '#1989fa', borderColor: '#1989fa' }"
        >
          现任团队重要成员
        </van-divider>

        <!-- 滑动翻页效果 -->
        <van-swipe :auto-play="false" style="width: 100%; height: auto">
          <!-- 第一页 -->
          <van-swipe-item>
            <van-card
              v-for="member in teamMembers.slice(0, 5)"
              :key="member.id"
              :title="`${member.role} - ${member.name}`"
              :thumb="member.photo"
            >
              <template #desc>
                <p>学号/职工号：{{ member.id }}</p>
                <p>邮箱：{{ member.id }}</p>
                <p>简介：{{ member.description }}</p>
              </template>
            </van-card>
          </van-swipe-item>

          <!-- 第二页 办公室 -->
          <van-swipe-item>
            <van-card
              v-for="member in teamMembers.slice(5, 8)"
              :key="member.id"
              :title="`${member.role} - ${member.name}`"
              :desc="member.description"
              :thumb="member.photo"
            />
          </van-swipe-item>

          <!-- 第三页 组织部 -->
          <van-swipe-item>
            <van-card
              v-for="member in teamMembers.slice(8, 11)"
              :key="member.id"
              :title="`${member.role} - ${member.name}`"
              :desc="member.description"
              :thumb="member.photo"
            />
          </van-swipe-item>

          <!-- 第四页 外联部 -->
          <van-swipe-item>
            <van-card
              v-for="member in teamMembers.slice(11, 14)"
              :key="member.id"
              :title="`${member.role} - ${member.name}`"
              :desc="member.description"
              :thumb="member.photo"
            />
          </van-swipe-item>

          <!-- 第五页 网络部 -->
          <van-swipe-item>
            <van-card
              v-for="member in teamMembers.slice(14, 17)"
              :key="member.id"
              :title="`${member.role} - ${member.name}`"
              :desc="member.description"
              :thumb="member.photo"
            />
          </van-swipe-item>

          <!-- 第六页 新闻中心 -->
          <van-swipe-item>
            <van-card
              v-for="member in teamMembers.slice(17, 20)"
              :key="member.id"
              :title="`${member.role} - ${member.name}`"
              :desc="member.description"
              :thumb="member.photo"
            />
          </van-swipe-item>

          <!-- 第七页 未来探索公益项目组 -->
          <van-swipe-item>
            <van-card
              v-for="member in teamMembers.slice(20, 22)"
              :key="member.id"
              :title="`${member.role} - ${member.name}`"
              :desc="member.description"
              :thumb="member.photo"
            />
          </van-swipe-item>
        </van-swipe>
      </section>

      <!-- 特色活动部分 -->
      <section class="featured-activities">
        <van-divider
          content-position="left"
          :style="{ color: '#1989fa', borderColor: '#1989fa' }"
          >特色活动</van-divider
        >
        <div class="activity-list">
          <div class="activity-item">
            <img
              src="@/assets/images/duiqi.jpg"
              alt="爱心雨伞"
              class="activity-image"
            />
            <h3>爱心雨伞</h3>
            <p>
              爱心雨伞志愿者活动以“伞下的回眸，是爱心的滋养”为主题，在各教学楼门口及重要交通节点设置借还点，利用小程序管理雨伞借还。活动定期开展，包括宣传教育、检查维护和收集反馈等内容，旨在解决师生雨天出行难题，培养诚信意识，营造关爱文化。
            </p>
          </div>
          <div class="activity-item">
            <img
              src="@/assets/images/duiqi.jpg"
              alt="向日葵基地"
              class="activity-image"
            />
            <h3>向日葵基地</h3>
            <p>
              向日葵基地志愿服务活动于 2024
              年秋期每单周周五下午在重庆市南岸区开展。志愿者陪伴孩子玩益智玩具、识字，参与社会融合及进行编程培训。活动旨在关爱孩子、促进交流、提升志愿者意识并引起社会对特殊儿童的关注。
            </p>
          </div>
          <div class="activity-item">
            <img
              src="@/assets/images/duiqi.jpg"
              alt="一天门社区青少年活动中心"
              class="activity-image"
            />
            <h3>一天门社区青少年活动中心</h3>
            <p>
              一天门社区青少年活动中心志愿者活动以“启智未来，智慧同行”为主题，在重庆市南岸区开展。活动包括物理实验、编程入门等内容，旨在普及科学知识、培养创新精神，为孩子们提供交流平台，激发探索兴趣。
            </p>
          </div>
          <div class="activity-item">
            <img
              src="@/assets/images/duiqi.jpg"
              alt="一天门社区养老院"
              class="activity-image"
            />
            <h3>一天门社区养老院</h3>
            <p>
              一天门社区养老院志愿者活动以“关爱夕阳，温暖同行”为主题，在重庆市南岸区该养老院开展。活动内容包括日常陪伴、生活照料、文化娱乐和环境美化等。旨在关爱老人、传承美德、增进沟通、提升志愿者能力。
            </p>
          </div>
          <div class="activity-item">
            <img
              src="@/assets/images/duiqi.jpg"
              alt="技能培训"
              class="activity-image"
            />
            <h3>技能培训</h3>
            <p>
              该活动由青队网络部承办，专注于提供Photoshop（PS）、Premiere（PR）和PowerPoint（PPT）技能培训，旨在帮助青队成员提升数字媒体处理能力。通过技能培训和实践操作，学员可以学习到图像编辑、视频制作和演示设计技巧。
            </p>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<style scoped>
.team-sign {
  text-align: center;
  background-color: white;
  padding: 10px;
  border-radius: 20px;
}

.team-logo {
  width: 100%;
  border-radius: 20px;
}

.team-details {
  padding: 0 20px;
}

.description {
  text-align: justify;
  line-height: 1.5;
  letter-spacing: 1px;
}

.activity-list {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.activity-item {
  width: 300px;
}

.activity-image {
  width: 100%;
  border-radius: 20px;
}
</style>
