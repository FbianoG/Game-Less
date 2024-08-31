import './Toast.css'

interface ToastProps {
    text: { text: string, type: 'success' | 'error' }
    onClick: (a: false) => void
}

const Toast: React.FC<ToastProps> = ({ text, onClick }) => {

    return (<>
        {text.type === 'error' && <div className='toast'>
            <i className="fa-solid fa-triangle-exclamation"></i>
            {text.text}
            <button onClick={() => onClick(false)}><i className="fa-regular fa-circle-xmark"></i></button>
        </div>

        }
        {text.type === 'success' && <div className='toast success'>
            <i className="fa-solid fa-check"></i>
            {text.text}
            <button onClick={() => onClick(false)}><i className="fa-regular fa-circle-xmark"></i></button>
        </div>

        }
    </>
    )
}

export default Toast