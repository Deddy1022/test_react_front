import { useNotification } from '@/hooks/NotificationContext';

export const NotificationSystem = () => {
  const { notifications, hideNotification } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map(notification => (
        <div 
          key={notification.id}
          className={`p-4 rounded-md shadow-md flex justify-between items-center transition-all duration-300 max-w-xs ${
            notification.type === 'success' ? 'bg-green-100 text-green-800 border-l-4 border-green-500' :
            notification.type === 'error' ? 'bg-red-100 text-red-800 border-l-4 border-red-500' :
            notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500' :
            'bg-blue-100 text-blue-800 border-l-4 border-blue-500'
          }`}
        >
          <div className="flex items-center">
            <span className="mr-2">
              {notification.type === 'success' && '✅'}
              {notification.type === 'error' && '❌'}
              {notification.type === 'warning' && '⚠️'}
              {notification.type === 'info' && 'ℹ️'}
            </span>
            <p>{notification.message}</p>
          </div>
          <button 
            onClick={() => hideNotification(notification.id)}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};