import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
        >
            <div className="flex flex-col gap-6 text-center text-white">
                <h1 className="text-8xl font-extrabold">
                    404
                </h1>
                <p className="text-2xl">Page Not Found</p>
                <Button
                    size="lg"
                    variant="secondary"
                    onClick={() => navigate('/')}
                >
                    Go Home
                </Button>
            </div>
        </div>
    );
};

export default NotFound;
