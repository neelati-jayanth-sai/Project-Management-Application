import logo from './assets/logo.png';

export default function Header() {
  return (
    <nav className='navbar bg-light mb-4 p-0'>
      <div className='container d-flex justify-content-between align-items-center'>
        <a className='navbar-brand' href='/'>
          <div className='d-flex align-items-center'>
            <img src={logo} alt='Project Management Logo' className='mr-2' />
            <div>Project Management</div>
          </div>
        </a>
        <div className='d-flex'>
          <a href='/clients' className='btn btn-secondary mr-2'>
            Clients
          </a>
          <a href='/projects' className='btn btn-primary'>
            Projects
          </a>
        </div>
      </div>
    </nav>
  );
}
