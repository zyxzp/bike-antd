import React from 'react';
import { Card, Button, Table, Form, Select, Modal, message, Input, DatePicker } from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;
export default class Order extends React.Component {
    filterForm = {};
    params = {
        page: 1
    }
    state = {
        list: [],
        pagination: []
    };
    componentDidMount() {
        this.request();
    }
    // 动态获取mock数据
    request = () => {
        let _this = this;
        axios.ajax({
            url: '/order/list',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            if (res.code === 0) {
                res.result.list.map((item, index) => {
                    item.key = index;
                })
                this.setState({
                    list: res.result.list,
                    selectedRowKeys: [],
                    selectedRows: null,
                    pagination: Utils.pagination(res, (current) => {
                        _this.params.page = current;
                        this.request();
                    })
                })
            }
        })
    }
    //查询
    handleQuery = () => {
        let queryInfo = this.filterForm.props.form.getFieldsValue();
        message.info(JSON.stringify(queryInfo));
    }
    //订单详情
    openOrderDetail = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请先选择一条订单'
            })
            return;
        }
        window.open(`/#/common/order/detail/${item.id}`,'_blank')
    }
    //结束订单
    handleConfirm = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请先选择一条订单'
            })
            return;
        }
    }
    onRowClick = (record, index) => {
        let selectKey = [index];
        Modal.info({
            title: '信息',
            content: JSON.stringify(record)
        })
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }
    render() {
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance) {
                    return distance / 1000 + 'Km';
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ]
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        return (
            <div>
                <Card>
                    <FilterForm handleSubmit={this.handleQuery}
                        wrappedComponentRef={(inst) => { this.filterForm = inst; }} />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" style={{ marginLeft: 10 }} onClick={this.handleConfirm}>结束订单</Button>
                </Card>

                <div>
                    <Table
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index);
                                }
                            };
                        }}
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
            </div>
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
                    <Button onClick={() => { this.props.form.resetFields() }}>重置</Button>
                </FormItem>
            </Form>
        );
    }
}
FilterForm = Form.create()(FilterForm);