import { CloseAlertIcon } from '@/shared/icons/CloseAlertIcon';
import { Toaster, toast } from 'react-hot-toast';

export const Alert = () => (
    <Toaster
        position="bottom-left"
        containerStyle={{
            left: '173px',
            bottom: '24px'
        }}
        toastOptions={{
            duration: 4000,
            style: {
                width: '387px',
                height: '48px',
                padding: '12px 24px',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: 'var(--color-light-100)',
                fontSize: 'var(--font-size-m)',
                fontWeight: 'var(--font-weight-regular)',
                lineHeight: 'var(--line-height-m)',
            },
            success: {
                style: {
                    background: 'var(--color-success-900)',
                    border: '1px solid var(--color-success-500)',
                },
            },
            error: {
                style: {
                    background: 'var(--color-danger-900)',
                    border: '1px solid var(--color-danger-500)',
                },
            },
        }}
    >
        {(t) => (
            <div className={t.className} style={t.style}>
                <span>{t.message as string}</span>
                <button
                    onClick={() => toast.remove(t.id)} 
                    style={{
                        cursor: 'pointer',
                    }}
                >
                    <CloseAlertIcon />
                </button>
            </div>
        )}
    </Toaster>
);

export const alert = {
    success: (message: string = 'Your settings are saved') =>
        toast.success(message),

    error: (message: string = 'Server is not available') =>
    toast.error(
        <span>
            <span style={{ fontWeight: 'var(--font-weight-bold)' }}>Error! </span>
            {message}
        </span>
    )
};