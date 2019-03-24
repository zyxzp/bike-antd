import React from 'react';
import { Card, Button, Table, Form, Select, Modal, message, Input, DatePicker } from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;
export default class Order extends React.Component {
    filterForm = {};
    handleQuery = () => {
        let queryInfo = this.filterForm.props.form.getFieldsValue();
        message.info(JSON.stringify(queryInfo));
    }
    render() {
        return (
            <Card>
                <FilterForm handleSubmit={this.handleQuery}
                    wrappedComponentRef={(inst) => { this.filterForm = inst; }} />
            </Card>
        );
    }
}
class FilterForm extends React.Component {
    render() {
        let { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="城市">
                    {getFieldDecorator('city_id', {
                        initialValue: "0"
                    })(
                        <Select
                            style={{ width: 100 }}
                            placeholder="全部"
                        >
                            <Option value="0">全部</Option>
                            <Option value="1">北京市</Option>
                            <Option value="2">天津市</Option>
                            <Option value="3">深圳市</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem >
                    {getFieldDecorator('range_time')(
                        <RangePicker
                            showTime={{ format: 'HH:mm:ss' }}
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder={['开始时间', '结束时间']}
                        />
                    )}
                </FormItem>

                <FormItem label="订单状态">
                    {getFieldDecorator('order_status', {
                        initialValue: "0"
                    })(
                        <Select
                            style={{ width: 100 }}
                            placeholder="全部"
                        >
                            <Option value="0">全部</Option>
                            <Option value="1">北京市</Option>
                            <Option value="2">天津市</Option>
                            <Option value="3">深圳市</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{ marginRight: 10 }} onClick={this.props.handleSubmit}>查询</Button>
                    <Button onClick={()=>{this.props.form.resetFields()}}>重置</Button>
                </FormItem>
            </Form>
        );
    }
}
FilterForm = Form.create()(FilterForm);