import EditorWang from '@/components/@lgs/EditorWang';
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormInstance,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useNavigate, useParams } from '@umijs/max';
import { App } from 'antd';
import React, { useEffect, useRef } from 'react';
const AddOrUpdate: React.FC = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const vForm = useRef<ProFormInstance>();

  const { message, modal } = App.useApp();

  const getDetails = () => {
    const data = {
      id: 'f8EfF4Fd-B4Ee-2F40-1B9a-590e0B7b938A',
      title: '智能投影仪的新战事',
      content:
        '<p><span style="color: rgb(0, 0, 0); font-size: 14px;">成都市是</span><span style="color: rgb(0, 0, 0); font-size: 14px;"><u>四川省省会</u></span><span style="color: rgb(0, 0, 0); font-size: 14px;">，也是全国15个副省级城市之一，地处四川盆地西部，青藏高原东缘，东北与德阳市、东南与资阳市毗邻，南面与眉山市相连，西南与雅安市、西北与阿坝藏族羌族自治州接壤；地理位置介于东经102°54′～104°53′、北纬30°05′～31°26′之间。2017年，全市土地面积为14335平方公里、占全省总面积（48.5万平方公里）的2.95％；市区面积为3639.81平方公里，其中市辖区建成区面积885.6平方公里。截至2017年，成都市辖锦江、青羊、金牛、武侯、成华、龙泉驿、青白江、新都、温江、双流、郫都11个区，简阳、都江堰、彭州、邛崃、崇州5个县级市，金堂、大邑、蒲江、新津4个县。</span><span style="color: rgb(54, 88, 226); font-size: 14px;"><strong>成都市有国家级新区――四川天府新区成都直管区，国家自主创新示范区――成都高新技术产业开发区，国家级经济技术开发区――成都经济技术开发区</strong></span><span style="color: rgb(0, 0, 0); font-size: 14px;">。</span></p><p><img src="https://img0.baidu.com/it/u=1161952688,1151684055&fm=253&fmt=auto&app=138&f=JPEG?w=600&h=400" alt="" data-href="" style=""/></p><p><span style="color: rgb(0, 0, 0); font-size: 14px;">成都市人口稳定增长，有常住人口1604.5万人，比上年增长0.8％；城镇化率达71.9％；有户籍人口1435.3万人，其中城镇人口851.2万人、乡村人口584.1万人；出台人才新政十二条，全日制本科以上学历青年人才落户超过11万人。全市居民收入稳步提高，城镇居民人均可支配收入38918元、比上年增长8.4％，农村居民人均可支配收入20298元、增长9.1％；城乡人均收入倍差1.92，比上年缩小0.01；城乡居民储蓄存款余额11970.8亿元、增长6.8％；脱贫攻坚成效显著，实现全市85个贫困村退出、29878人脱贫。全市社会就业形势良好，全年城镇新增就业27.6万人，其中持《再就业优惠证》人员实现再就业7.7万人，“4050”等就业困难人员实现再就业1.8万人；农村劳动力转移到非农产业就业新增8.6万人，农村劳动力劳务输出人数为253.0万人；城镇登记失业率3.2％。全市社会保障更加完善，参加城镇基本养老保险人数719.6万人，其中参保职工529.1万人；参加城镇基本医疗保险人数743.9万人，其中参保职工562.0万人；征地农民参加养老医疗保险人数164.6万人；有2.8万名城镇居民、10.6万名农村居民得到政府最低生活保障，保障资金投入6.3亿元，其中投入农村4.5亿元；有各类社会养老机构226个，拥有床位3.5万张；有社区养老设施1741个，拥有床位3.1万张；有各种社区服务设施6814处，社区服务中心344个。</span></p><p><img src="https://img0.baidu.com/it/u=3869361624,1214539907&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=360" alt="" data-href="" style=""/></p><p><span style="color: rgb(54, 88, 226); font-size: 14px;">成都市地处四川盆地西部边缘，地势由西北向东南倾斜；西部属于四川盆地边缘地区，以深丘和山地为主，海拔大多在1000～3000米之间，最高处位于大邑县西岭镇大雪塘（苗基岭），海拔高度为5364米；东部属于四川盆地盆底平原，为岷江、湔江等江河冲积而成，是成都平原的腹心地带，主要由平原、台地和部分低山丘陵组成，海拔高度一般在750米上下，最低处在简阳市沱江出境处河岸，海拔高度为359米。成都市由于巨大的垂直高差，在市域内形成三分之一平原、三分之一丘陵、三分之一高山的独特地貌类型；由于气候的显著分异，形成明显的不同热量差异的垂直气候带，因而在区域范围内生物资源种类繁多、门类齐全，分布又相对集中，为发展农业和旅游业带来极为有利的条件。</span></p>',
      type: 2,
      category: 2,
      date: '1971-07-30 15:44:20',
    };
    vForm.current?.setFieldsValue({ ...data });
  };
  useEffect(() => {
    if (params.id) {
      getDetails();
    }
  }, []);
  return (
    <PageContainer>
      <ProCard>
        <ProForm
          formRef={vForm}
          layout={'horizontal'}
          onFinish={async () => {
            message.loading('处理中，请稍后...');
            setTimeout(() => {
              message.destroy();
              modal.success({
                title: '温馨提示',
                content: params.id ? '编辑成功' : '创建成功',
                okText: '返回',
                onOk() {
                  navigate(-1);
                },
              });
            }, 1000);
          }}
        >
          {params.id && <ProFormText name="id" noStyle hidden />}
          <ProFormTextArea
            label="标题"
            placeholder="请输入新闻标题"
            name="title"
            rules={[{ required: true }]}
          />
          <ProFormRadio.Group
            layout="horizontal"
            name="type"
            label="类型"
            rules={[{ required: true }]}
            options={[
              {
                label: '案例新闻',
                value: 1,
              },
              {
                label: '动态新闻',
                value: 2,
              },
            ]}
          />
          <ProFormRadio.Group
            layout="horizontal"
            name="category"
            label="分类"
            rules={[{ required: true }]}
            options={[
              { label: '文明实践', value: 1 },
              { label: '爱国卫生月', value: 2 },
              { label: '志愿服务', value: 3 },
            ]}
          />

          <ProFormText label="内容" name="content" rules={[{ required: true }]}>
            <EditorWang />
          </ProFormText>
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default AddOrUpdate;
