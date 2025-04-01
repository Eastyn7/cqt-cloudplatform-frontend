<script setup lang="ts">
import { useTeamStore } from '@/stores/modules/teamInfo'

const useTeam = useTeamStore()

// 存储从后端获取的文本
const defaultDescription = ref(
  `重庆工商大学人工智能学院“小红帽”常青藤青年志愿者服务队（青队）是一支热情洋溢的志愿团队。其架构清晰，含队长团、部长团及干事层，下设办公室、组织部、宣传部、外联部、网络部及特色公益项目组。各部门协同合作，确保团队工作顺畅。
青队拥有向日葵智力残疾人复托养中心和一天门社区两大基地，为志愿者提供实践舞台。秉承“奉献青春，弘扬志愿”精神，青队积极参与多样志愿服务。其中特色公益项目组含物理、编程、智能科普组及科普宣传组。他们各有职责，如课堂设计、课程计划、智能化开发等，还负责“小老师”培训及活动协调、招募等工作。`
)

const description = ref('')
const teamMembers = ref([])
const groupedMembers = ref<Record<number, any[]>>({})
const activeNames = ref<string[]>([]) // 折叠项控制

// 转换换行符为 <p> 标签的函数，并加上缩进
const convertNewlinesToParagraphs = (text: string): string => {
  return text
    .split('\n')
    .map((paragraph) => `<p style="text-indent: 4ch;">${paragraph}</p>`)
    .join('')
}

// 按部门分类成员的函数
const groupMembersByDepartment = () => {
  const grouped: Record<number, any[]> = {}
  teamMembers.value.forEach((member: any) => {
    const departmentId = Number(member.department_id) // 确保是数字
    if (!grouped[departmentId]) {
      grouped[departmentId] = []
    }
    grouped[departmentId].push(member)
  })
  groupedMembers.value = grouped // 更新 ref 变量
}

onMounted(async () => {
  description.value = convertNewlinesToParagraphs(defaultDescription.value)
  try {
    const result = await useTeam.getBackbonesInfo()
    if (result) {
      teamMembers.value = result.members.map((member: any) => ({
        id: member.student_id,
        name: member.username,
        role: member.role_name,
        department_id: Number(member.department_id),
        description: member.description,
        photo: member.photo
      }))
      groupMembersByDepartment() // 获取数据后手动调用分类函数
    }
  } catch (err) {
    console.error('获取成员信息失败', err)
    showFailToast({
      message: '获取成员信息失败',
      position: 'top',
      className: 'custom-fail-toast'
    })
  }
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

        <van-swipe :auto-play="false" style="width: 100%; height: auto">
          <van-swipe-item
            v-if="groupedMembers[1]?.length || groupedMembers[2]?.length"
          >
            <van-card
              v-for="member in [
                ...(groupedMembers[1] || []),
                ...(groupedMembers[2] || [])
              ]"
              :key="member.id"
              :title="`${member.role} - ${member.name}`"
              :thumb="member.photo"
            >
              <template #desc>
                <p>学号/职工号：{{ member.id }}</p>
                <p>简介：{{ member.description }}</p>
              </template>
            </van-card>
          </van-swipe-item>

          <!-- 其他部门（department_id > 2）的成员 -->
          <template
            v-for="(members, departmentId) in groupedMembers"
            :key="departmentId"
          >
            <van-swipe-item v-if="departmentId > 2">
              <van-card
                v-for="member in members"
                :key="member.id"
                :title="`${member.role} - ${member.name}`"
                :thumb="member.photo"
              >
                <template #desc>
                  <p>学号/职工号：{{ member.id }}</p>
                  <p>简介：{{ member.description }}</p>
                </template>
              </van-card>
            </van-swipe-item>
          </template>
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
              src="@/assets/images/爱心雨伞.png"
              alt="爱心雨伞"
              class="activity-image"
            />
            <h3>🌂爱心雨伞活动——办公室</h3>
            <p class="description">
              南岸校区的 12 个伞站里，800 + 把印着"青队"LOGO
              的爱心雨伞随时待命。扫码即取的智能借还，让骤雨突至的师生免于奔逃
              ——
              图书馆北门前，被雨困住的老教授曾说："伞柄的防滑纹，比天气预报更暖。"
              三年流转数据显示，92% 的伞具被归还时带着体温，18%
              的伞里夹着感谢便签。这场静默的守护，让青队的爱心雨伞成为校园雨天最安心的注脚。
            </p>
          </div>
          <div class="activity-item">
            <img
              src="@/assets/images/向日葵基地活动.jpg"
              alt="向日葵基地"
              class="activity-image"
            />
            <h3>🌻向日葵基地活动——外联部</h3>
            <p class="description">
              面向自闭症儿童的活动室里，青队志愿者发明
              "非语言沟通包"：情绪积木、绘画猜心卡、触感故事书。孩子们用蜡笔涂抹的星空、用黏土捏的月亮，被收集成
              "星星的礼物"
              公益展。最动人的瞬间，是一个男孩突然把自己的拼图推给志愿者 ——
              这是他三个月来第一次主动分享。三年间，27 个 "星星的孩子"
              在这里打开心门，青队的橙色，成为他们星球上温暖的坐标。
            </p>
          </div>
          <div class="activity-item">
            <img
              src="@/assets/images/一天门社区.jpg"
              alt="一天门社区"
              class="activity-image"
            />
            <h3>🔬一天门社区——组织部</h3>
            <p class="description">
              社区活动室的白墙上，贴满孩子们的实验手账：用可乐瓶做的
              "彩虹瀑布"、锡纸折的 "太阳能小车"。青队志愿者设计 "知识盲盒 +
              动手工坊"，把物理现象变成看得见的游戏，编程逻辑化作闯关任务。最受欢迎的
              "空气大炮" 实验，让五年级男孩第一次惊呼："原来空气会打拳！"
              累计服务 1200 + 人次的科普角，让青队的橙色马甲成为孩子们眼中
              "会变魔术的颜色"。
            </p>
          </div>
          <div class="activity-item">
            <img
              src="@/assets/images/PSPRPPT.jpg"
              alt="PSPRPPT"
              class="activity-image"
            />
            <h3>🎨PSPRPPT——网络部</h3>
            <p class="description">
              机房里，青队技能组把服务故事变成 PPT
              动效，将老人的回忆剪成纪录片，用海报设计传递环保理念。"好的志愿展示，要让观众看见心跳。"
              这句标语贴在每台电脑上。累计培训 200 + 人次的技能课，产出 2000 +
              张公益海报、100 + 部短片，其中 "时光相册"
              系列让校志愿大赛评委动容："技术有温度，公益才会被记住。"
            </p>
          </div>
          <div class="activity-item">
            <img
              src="@/assets/images/科普.png"
              alt="科普"
              class="activity-image"
            />
            <h3>🔭科普——公益项目组</h3>
            <p class="description">
              走进 8 所小学的 "实验盲盒车"，装着空气大炮、编程闯关卡、AI 机器人
              "豆包"。青队志愿者把物理原理变成好玩的游戏：保鲜膜 +
              塑料桶的气浪冲击，Scratch
              代码指挥的豌豆射手，让孩子们惊呼："科学比动画片还酷！"
              每个盲盒附带的彩虹瓶材料包，让知识从课堂延伸到家庭。1500 +
              双眼睛因橙色马甲亮起的星光，是科普最动人的注脚。
            </p>
          </div>
          <div class="activity-item">
            <img
              src="@/assets/images/河小清.jpg"
              alt="科普"
              class="activity-image"
            />
            <h3>🌊河小清——新闻中心</h3>
            <p class="description">
              花溪河畔的 20
              个水质监测点，记录着青队志愿者的弯腰瞬间：打捞塑料袋的夹子、救助迷路小鸭子的网兜、收集落叶的橙色垃圾袋。"清洁
              + 科普" 双模式下，孩子们用显微镜观察水样，居民在 "河流故事会"
              里拼出生态地图。三年清理 15 公里河道，带走 2
              吨垃圾，留下的不仅是碧水，更是 "环保不是口号，是弯腰的本能"
              的共识。
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
  width: 100%;
}

.activity-image {
  width: 100%;
  border-radius: 20px;
}
</style>
