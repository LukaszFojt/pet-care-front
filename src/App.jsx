import AnimatedRoutes from './AnimatedRoutes';
import { TranslationContextProvider } from './TranslationContext';
import { UserContextProvider } from './UserContext';
import { DialogProvider } from './DialogContext';
import Dialogs from './dialogs/Dialogs';

function App() {
  return (
    <TranslationContextProvider>
      <UserContextProvider>
        <DialogProvider>
          <Dialogs />
          <AnimatedRoutes />
        </DialogProvider>
      </UserContextProvider>
    </TranslationContextProvider>
  );
}

export default App;
