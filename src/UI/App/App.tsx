/* eslint-disable react/no-children-prop */
import { store } from 'Redux/Store';
import { PageLayout } from 'Components/PageLayout';
import { Home } from 'Pages/Home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Group } from 'Pages/Group';

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<Home />} />
            <Route path="/:id" element={<Group />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
