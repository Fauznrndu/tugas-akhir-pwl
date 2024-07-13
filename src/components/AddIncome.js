import React from 'react';
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';

const AddIncome = ({isIncomeModalVisible, handleIncomeCancel, onFinish}) => {
  const [form] = Form.useForm();
  return (
    <div>
      <Modal style={{ fontWeight: 600}} title="Add Income" visible={isIncomeModalVisible} onCancel={handleIncomeCancel} footer={null}>
        <Form form={form} layout='vertical' onFinish={(values) => {
          onFinish(values, "income");
          form.resetFields();
          }}
          >
          <Form.Item style={{ fontWeight: 600}} label="Name" name="name" rules={[
            {
              required: true, message: "Please input the name of the transaction!"
            }]}>
            <Input type='text' className=''/>
          </Form.Item>

          <Form.Item style={{ fontWeight: 600}} label="Amount" name="amount" rules={[
            {
              required: true, message: "Please input the income amount!"
            }]}>
            <Input type='number' className=''/>
          </Form.Item>

          <Form.Item style={{fontWeight: 600 }} label="Date" name="date" rules={[
            {
              required: true, message: "Please select the income date!"
            }]}>
            <DatePicker className='' format="YYYY-MM-DD"/>
          </Form.Item>

          <Form.Item style={{fontWeight: 600 }} label="Category" name="category" rules={[
            {
              required: true, message: "Please select a category!"
            }]}>
              <Select className=''>
                <Select.Option value="salary">Salary</Select.Option>
              </Select>
          </Form.Item>
          
          <Form.Item>
            <Button className='' type='' htmlType='submit'>
              Add Income
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AddIncome;
