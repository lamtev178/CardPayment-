import { Form, Input, Button, Row, Typography, DatePicker } from 'antd';
import "antd/dist/antd.css";
import React, {useState}  from 'react'
const axios = require('axios').default;
const { Title} = Typography;
function App() {
  async function getUser(CardNumber, ExpirationDate, CVV, Amount) {
  try {
    const response = await axios.post('/card',{
    CardNumber : CardNumber,
    ExpirationDate : ExpirationDate,
    CVV : CVV,
    Amount : Amount
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

  const [form] = Form.useForm()
  const [disable, setDisable] = useState(true)
  const onFinish = (values) => {
    const ex = {...values, 'ExpirationDate': values['ExpirationDate'].format('MM/YYYY')}
    getUser(ex.CardNumber, ex.ExpirationDate, ex.CVV, ex.Amount)
  };

  return (
    <>
      <Title>Card Payments</Title>
      <Row justify='center' style={{paddingTop:'30px'}}>
      <Form form={form}
      onFieldsChange={()=> setDisable(!form.isFieldsTouched(true) || form.getFieldsError().some(({ errors }) => errors.length))}
      autoComplete="off"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        onFinishFailed={(err)=> console.log(err)}
      >
        <Form.Item
          label="Card Number"
          name="CardNumber"
          rules={[
            {
              required: true,
              message: 'Input your card number!',
            },
            {
            pattern: /^\d{16}$/,
            message: 'Only 16 digits'
            }
          ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="Expiration Date"
          name="ExpirationDate"
          rules={[
          {
            required: true,
            message: 'Input your card expiration date!',
          },
        ]}
        >
          <DatePicker picker="month" />
        </Form.Item>

        <Form.Item
          label="CVV"
          name="CVV"
          rules={[
          {
            required: true
          },
            {
            pattern: /^\d{3}$/,
            message: 'Only 3 digits'
            }
        ]}
        >
          <Input.Password />
        </Form.Item>
              <Form.Item
          label="Amount"
          name="Amount"
          rules={[
          {
            required: true
          },
          {
            pattern: /^\d+$/,
            message: 'Only digits'
          }
        ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" disabled={disable}>
            Оплатить
          </Button>
        </Form.Item>
      </Form>
      </Row>
    </>
  );
}

export default App;
