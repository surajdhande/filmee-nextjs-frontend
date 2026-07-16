export default function MessagesPage() {
    return (
        <div className="h-[calc(100vh-64px)] flex">
            <div className="w-1/3 border-r border-gray-300">
                Conversation List
            </div>

            <div className="flex-1">
                Chat Window
            </div>
        </div>
    );
}