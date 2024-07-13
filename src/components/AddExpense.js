import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import React from 'react';

const AddExpense = ({isExpenseModalVisible, handleExpenseCancel, onFinish}) => {
  const [form] = Form.useForm();
  return (
   <Modal style={{}} title="Add Expense" visible={isExpenseModalVisible} onCancel={handleExpenseCancel} footer={null}>
      <Form form={form} layout='vertical' onFinish={(values) => {onFinish(values, "expense");
        form.resetFields();
        }}
      >
        <Form.Item style={{ fontWeight: 600 }} label="Name" name="name" rules={[
          {
            required: true, message: "Please input the name of the transaction!"
          }]}>
          <Input type='text' className=''/>
        </Form.Item>

        <Form.Item style={{fontWeight: 600 }} label="Amount" name="amount" rules={[
          {
            required: true, message: "Please input the expense amount!"
          }]}>
          <Input type='number' className=''/>
        </Form.Item>

        <Form.Item style={{fontWeight: 600 }} label="Date" name="date" rules={[
          {
            required: true, message: "Please select the expense date!"
          }]}>
          <DatePicker className='' format="YYYY-MM-DD"/>
        </Form.Item>

        <Form.Item style={{fontWeight: 600 }} label="Category" name="category" rules={[
          {
            required: true, message: "Please select a category!"
          }]}>
            <Select className=''>
              <Select.Option value="shopping">Shopping</Select.Option>
              <Select.Option value="food and drinks">Food and Drinks</Select.Option>
              <Select.Option value="bill and utilities">Bill and Utilities</Select.Option>
              <Select.Option value="others">Others</Select.Option>
            </Select>
        </Form.Item>
        
        <Form.Item>
          <Button className='' type='' htmlType='submit'>
            Add Expense
          </Button>
        </Form.Item>
      </Form>
   </Modal>
  );
}

export default AddExpense;
