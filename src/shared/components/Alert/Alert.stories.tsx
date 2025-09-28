import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Alert, alert } from './Alert'
import { Button } from '../Button'

const meta = {
    component: Alert,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    title: 'Components/Alert',
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        return (
            <div>
                <Alert />
                <Button onClick={() => alert.success()} className='mr-4 bg-success-700'>Success :)</Button>
                <Button onClick={() => alert.error()} className='bg-danger-700'>Error :(</Button>
            </div>
        )
    },
}

export const CustomAlertMessage: Story = {
    render: () => {
        return (
            <div>
                <Alert />
                <Button onClick={() => alert.success('Кастомное сообщение о каком-то успехе')} className='mr-4 bg-success-700'>Success :)</Button>
                <Button onClick={() => alert.error('Кастомное сообщение о какой-то ошибке')} className='bg-danger-700'>Error :(</Button>
            </div>
        )
    },
}

