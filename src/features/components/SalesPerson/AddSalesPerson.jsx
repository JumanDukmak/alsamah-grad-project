import { useEffect, useState } from 'react';
import { Form, Input, Modal, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addSalesPersonStart, resetData_salesPersons } from '../../redux/SalesPerson/salesPersonSlice';

export default function AddSalesPerson({ open, setOpen }) {
    const dispatch = useDispatch();
    const salesPersons = useSelector((state) => state.salesPersons);

    const [api, contextHolder] = message.useMessage();
    useEffect(() => {
        if (salesPersons.message != null) {
            api.success(salesPersons.message);
            dispatch(resetData_salesPersons())
        }
        if (salesPersons.error != null) {
            api.error(salesPersons.error);
            dispatch(resetData_salesPersons())
        }
    }, [salesPersons.message, salesPersons.error]);

    const [salesPerson, setSalesPerson] = useState({
        first_name: "",
        last_name: "",
    })
    const handleAddSalesPerson = () => {
        dispatch(addSalesPersonStart(salesPerson))
        setOpen(false)
    }

    return (
        <>
            {contextHolder}
            <Modal
                open={open}
                title='إضافة قطاع'
                okText='إضافة قطاع'
                cancelText='إلغاء'
                onOk={handleAddSalesPerson}
                onCancel={() => {
                    setOpen(false)
                }}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <CancelBtn />
                        <OkBtn />
                    </>
                )}
            >
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                    hideRequiredMark
                >
                    <Form.Item
                        label="الاسم الأول"
                        name="الاسم الأول"
                        rules={[
                            {
                                required: true,
                                message: 'ادخل الاسم الأول !',
                            },
                        ]}
                    >
                        <Input onChange={(e) => setSalesPerson({ ...salesPerson, first_name: e.target.value })} />
                    </Form.Item>
                    <Form.Item
                        label="الاسم الأخير"
                        name="الاسم الأخير"
                        rules={[
                            {
                                required: true,
                                message: 'ادخل الاسم الأخير !',
                            },
                        ]}
                    >
                        <Input onChange={(e) => setSalesPerson({ ...salesPerson, last_name: e.target.value })} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}