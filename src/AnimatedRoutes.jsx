import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HomePage, AboutPage, NotFoundPage, AuthPage, ProfilePage, PostPage, PetPage, OrderPage, AccountPage, ChatPage, PostsPage } from './pages';
import Layout from './Layout';

function AnimatedRoutes() {
    return (
        <AnimatePresence mode="wait">
            <Routes>
                <Route
                    path="/"
                    element={<Layout />}>
                <Route
                    index
                    element={<HomePage />} 
                />
                <Route
                    path="/about"
                    element={<AboutPage />}
                />
                <Route
                    path="*"
                    element={<NotFoundPage />}
                />
                <Route 
                    path="/login" 
                    element={<AuthPage />} 
                />
                <Route 
                    path="/register" 
                    element={<AuthPage />} 
                />
                <Route
                    path="/account"
                    element={<AccountPage />}
                />
                <Route
                    path="/account/profile"
                    element={<ProfilePage />}
                />
                <Route
                    path="/account/post"
                    element={<PostPage />}
                />
                <Route
                    path="/account/order"
                    element={<OrderPage />}
                />
                <Route
                    path="/account/pet"
                    element={<PetPage />}
                />
                <Route
                    path="/account/chat"
                    element={<ChatPage />}
                />
                <Route
                    path="/posts"
                    element={<PostsPage />}
                />
                </Route>
            </Routes> 
        </AnimatePresence>
    )
}

export default AnimatedRoutes
