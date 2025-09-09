const AdminDashHome = ()=>{
    return(
        <>
         <main className="main">
          <div className="card-grid">
            {/* Card 1: Stats */}
            <div className="card">
              <h3 className="card-title">Total Users</h3>
              <p className="card-value">1,234</p>
              <p className="card-subtext">+5% from last month</p>
            </div>
            {/* Card 2: Activity */}
            <div className="card">
              <h3 className="card-title">Recent Activity</h3>
              <ul className="activity-list">
                <li>User X logged in</li>
                <li>User Y updated profile</li>
                <li>User Z completed task</li>
              </ul>
            </div>
            {/* Card 3: Chart Placeholder */}
            <div className="card">
              <h3 className="card-title">Analytics Overview</h3>
              <div className="chart-placeholder">Chart Placeholder</div>
            </div>
          </div>
        </main>
        
        </>
    )
}


export default AdminDashHome