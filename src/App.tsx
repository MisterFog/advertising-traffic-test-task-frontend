import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary, Footer, Header } from './components';
import Router from './Router';
import './assets/app.scss';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <UserProvider>
          <Header />
          <div className="content">
            <Router />
          </div>
          <Footer />
        </UserProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
