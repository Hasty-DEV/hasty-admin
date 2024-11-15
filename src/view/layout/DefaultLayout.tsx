import { Outlet } from 'react-router-dom';

export function DefaultLayout() {
  return (
    <div className="grid grid-cols-12">
      <aside className='col-span-1'></aside>
      <main className='col-span-11'>
        <Outlet />
      </main>
    </div>
  );
}
