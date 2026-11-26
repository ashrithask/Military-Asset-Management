import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api";

function App() {
  // =========================
  // LOGIN & RBAC
  // =========================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("Admin");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("Admin");
  const [assignedBase] = useState("Bangalore");

  const [activePage, setActivePage] = useState("Dashboard");

  const rolePermissions = {
    Admin: [
      "Dashboard",
      "Purchases",
      "Transfers",
      "Assignments",
      "Expenditures",
    ],

    "Base Commander": [
      "Dashboard",
      "Assignments",
      "Expenditures",
    ],

    "Logistics Officer": [
      "Dashboard",
      "Purchases",
      "Transfers",
    ],
  };

  const allowedPages = rolePermissions[userRole] || [];

  const navigationItems = [
    {
      name: "Dashboard",
      icon: "📊",
    },
    {
      name: "Purchases",
      icon: "📦",
    },
    {
      name: "Transfers",
      icon: "🔄",
    },
    {
      name: "Assignments",
      icon: "👤",
    },
    {
      name: "Expenditures",
      icon: "📉",
    },
  ];

  // =========================
  // PURCHASES
  // =========================

  const [purchases, setPurchases] = useState([]);

  const [purchaseForm, setPurchaseForm] = useState({
    equipmentName: "",
    equipmentType: "",
    quantity: "",
    baseName: "",
    purchaseDate: "",
  });

  // =========================
  // TRANSFERS
  // =========================

  const [transfers, setTransfers] = useState([]);

  const [transferForm, setTransferForm] = useState({
    equipmentName: "",
    quantity: "",
    fromBase: "",
    toBase: "",
    transferDate: "",
  });

  // =========================
  // ASSIGNMENTS
  // =========================

  const [assignments, setAssignments] = useState([]);

  const [assignmentForm, setAssignmentForm] = useState({
    equipmentName: "",
    personnelName: "",
    quantity: "",
    assignedDate: "",
  });

  // =========================
  // EXPENDITURES
  // =========================

  const [expenditures, setExpenditures] = useState([]);

  const [expenditureForm, setExpenditureForm] = useState({
    equipmentName: "",
    quantity: "",
    expendedDate: "",
  });

  // =========================
  // LOGIN
  // =========================

  const handleLogin = () => {
    if (email === "" || password === "") {
      alert("Please enter email and password");
      return;
    }

    setUserRole(selectedRole);
    setLoggedIn(true);
    setActivePage("Dashboard");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setEmail("");
    setPassword("");
    setSelectedRole("Admin");
    setUserRole("Admin");
    setActivePage("Dashboard");
  };

  // =========================
  // PURCHASES
  // =========================

  const loadPurchases = async () => {
    try {
      const response = await fetch(`${API_URL}/purchases`);

      if (!response.ok) {
        throw new Error("Failed to load purchases");
      }

      const data = await response.json();
      setPurchases(data);
    } catch (error) {
      console.error(error);
      alert("Could not connect to backend");
    }
  };

  const handlePurchaseChange = (event) => {
    setPurchaseForm({
      ...purchaseForm,
      [event.target.name]: event.target.value,
    });
  };

  const handlePurchaseSubmit = async (event) => {
    event.preventDefault();

    if (
      !purchaseForm.equipmentName ||
      !purchaseForm.equipmentType ||
      !purchaseForm.quantity ||
      !purchaseForm.baseName ||
      !purchaseForm.purchaseDate
    ) {
      alert("Please fill all purchase fields");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/purchases`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          equipmentName: purchaseForm.equipmentName,
          equipmentType: purchaseForm.equipmentType,
          quantity: Number(purchaseForm.quantity),
          baseName: purchaseForm.baseName,
          purchaseDate: purchaseForm.purchaseDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save purchase");
      }

      alert("Purchase recorded successfully!");

      setPurchaseForm({
        equipmentName: "",
        equipmentType: "",
        quantity: "",
        baseName: "",
        purchaseDate: "",
      });

      loadPurchases();
    } catch (error) {
      console.error(error);
      alert("Could not save purchase");
    }
  };

  // =========================
  // TRANSFERS
  // =========================

  const loadTransfers = async () => {
    try {
      const response = await fetch(`${API_URL}/transfers`);

      if (!response.ok) {
        throw new Error("Failed to load transfers");
      }

      const data = await response.json();
      setTransfers(data);
    } catch (error) {
      console.error(error);
      alert("Could not load transfers");
    }
  };

  const handleTransferChange = (event) => {
    setTransferForm({
      ...transferForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleTransferSubmit = async (event) => {
    event.preventDefault();

    if (
      !transferForm.equipmentName ||
      !transferForm.quantity ||
      !transferForm.fromBase ||
      !transferForm.toBase ||
      !transferForm.transferDate
    ) {
      alert("Please fill all transfer fields");
      return;
    }

    if (transferForm.fromBase === transferForm.toBase) {
      alert("From Base and To Base cannot be the same");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/transfers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          equipmentName: transferForm.equipmentName,
          quantity: Number(transferForm.quantity),
          fromBase: transferForm.fromBase,
          toBase: transferForm.toBase,
          transferDate: transferForm.transferDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save transfer");
      }

      alert("Transfer recorded successfully!");

      setTransferForm({
        equipmentName: "",
        quantity: "",
        fromBase: "",
        toBase: "",
        transferDate: "",
      });

      loadTransfers();
    } catch (error) {
      console.error(error);
      alert("Could not save transfer");
    }
  };

  // =========================
  // ASSIGNMENTS
  // =========================

  const loadAssignments = async () => {
    try {
      const response = await fetch(`${API_URL}/assignments`);

      if (!response.ok) {
        throw new Error("Failed to load assignments");
      }

      const data = await response.json();
      setAssignments(data);
    } catch (error) {
      console.error(error);
      alert("Could not load assignments");
    }
  };

  const handleAssignmentChange = (event) => {
    setAssignmentForm({
      ...assignmentForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleAssignmentSubmit = async (event) => {
    event.preventDefault();

    if (
      !assignmentForm.equipmentName ||
      !assignmentForm.personnelName ||
      !assignmentForm.quantity ||
      !assignmentForm.assignedDate
    ) {
      alert("Please fill all assignment fields");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/assignments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          equipmentName: assignmentForm.equipmentName,
          personnelName: assignmentForm.personnelName,
          quantity: Number(assignmentForm.quantity),
          assignedDate: assignmentForm.assignedDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save assignment");
      }

      alert("Asset assigned successfully!");

      setAssignmentForm({
        equipmentName: "",
        personnelName: "",
        quantity: "",
        assignedDate: "",
      });

      loadAssignments();
    } catch (error) {
      console.error(error);
      alert("Could not save assignment");
    }
  };

  // =========================
  // EXPENDITURES
  // =========================

  const loadExpenditures = async () => {
    try {
      const response = await fetch(`${API_URL}/expenditures`);

      if (!response.ok) {
        throw new Error("Failed to load expenditures");
      }

      const data = await response.json();
      setExpenditures(data);
    } catch (error) {
      console.error(error);
      alert("Could not load expenditures");
    }
  };

  const handleExpenditureChange = (event) => {
    setExpenditureForm({
      ...expenditureForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleExpenditureSubmit = async (event) => {
    event.preventDefault();

    if (
      !expenditureForm.equipmentName ||
      !expenditureForm.quantity ||
      !expenditureForm.expendedDate
    ) {
      alert("Please fill all expenditure fields");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/expenditures`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          equipmentName: expenditureForm.equipmentName,
          quantity: Number(expenditureForm.quantity),
          expendedDate: expenditureForm.expendedDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save expenditure");
      }

      alert("Expenditure recorded successfully!");

      setExpenditureForm({
        equipmentName: "",
        quantity: "",
        expendedDate: "",
      });

      loadExpenditures();
    } catch (error) {
      console.error(error);
      alert("Could not save expenditure");
    }
  };

  // =========================
  // LOAD ALL DATA
  // =========================

  useEffect(() => {
    if (loggedIn) {
      loadPurchases();
      loadTransfers();
      loadAssignments();
      loadExpenditures();
    }
  }, [loggedIn]);

  // =========================
  // DASHBOARD FILTERS
  // =========================

  const [dashboardDate, setDashboardDate] = useState("");
  const [dashboardBase, setDashboardBase] = useState("");
  const [dashboardType, setDashboardType] = useState("");
  const [showMovementDetails, setShowMovementDetails] = useState(false);

  /*
   * Base Commander is assigned to Bangalore for this demo.
   * Therefore the dashboard automatically uses Bangalore.
   */
  const effectiveDashboardBase =
    userRole === "Base Commander"
      ? assignedBase
      : dashboardBase;

  const equipmentTypeByName = {};

  purchases.forEach((purchase) => {
    equipmentTypeByName[purchase.equipmentName] =
      purchase.equipmentType;
  });

  const filteredPurchases = purchases.filter(
    (purchase) =>
      (!dashboardDate ||
        purchase.purchaseDate === dashboardDate) &&
      (!effectiveDashboardBase ||
        purchase.baseName === effectiveDashboardBase) &&
      (!dashboardType ||
        purchase.equipmentType === dashboardType)
  );

  const filteredTransfers = transfers.filter(
    (transfer) =>
      (!dashboardDate ||
        transfer.transferDate === dashboardDate) &&
      (!effectiveDashboardBase ||
        transfer.fromBase === effectiveDashboardBase ||
        transfer.toBase === effectiveDashboardBase) &&
      (!dashboardType ||
        equipmentTypeByName[transfer.equipmentName] ===
          dashboardType)
  );

  const filteredAssignments = assignments.filter(
    (assignment) =>
      (!dashboardDate ||
        assignment.assignedDate === dashboardDate) &&
      (!dashboardType ||
        equipmentTypeByName[assignment.equipmentName] ===
          dashboardType)
  );

  const filteredExpenditures = expenditures.filter(
    (expenditure) =>
      (!dashboardDate ||
        expenditure.expendedDate === dashboardDate) &&
      (!dashboardType ||
        equipmentTypeByName[expenditure.equipmentName] ===
          dashboardType)
  );

  const totalPurchased = filteredPurchases.reduce(
    (total, purchase) =>
      total + Number(purchase.quantity || 0),
    0
  );

  const transferOut = filteredTransfers.reduce(
    (total, transfer) => {
      if (
        !effectiveDashboardBase ||
        transfer.fromBase === effectiveDashboardBase
      ) {
        return total + Number(transfer.quantity || 0);
      }

      return total;
    },
    0
  );

  const transferIn = filteredTransfers.reduce(
    (total, transfer) => {
      if (
        !effectiveDashboardBase ||
        transfer.toBase === effectiveDashboardBase
      ) {
        return total + Number(transfer.quantity || 0);
      }

      return total;
    },
    0
  );

  const totalAssigned = filteredAssignments.reduce(
    (total, assignment) =>
      total + Number(assignment.quantity || 0),
    0
  );

  const totalExpended = filteredExpenditures.reduce(
    (total, expenditure) =>
      total + Number(expenditure.quantity || 0),
    0
  );

  const openingBalance = 0;

  const netMovement =
    totalPurchased + transferIn - transferOut;

  const closingBalance =
    openingBalance +
    netMovement -
    totalAssigned -
    totalExpended;

  // =========================
  // LOGIN PAGE
  // =========================

  if (!loggedIn) {
    return (
      <div className="login-page">

        <div className="login-card">

          <div className="login-icon">
            🛡️
          </div>

          <h1>Military Asset Management</h1>

          <p className="login-subtitle">
            Secure Asset Management System
          </p>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleLogin();
            }}
          >

            <div className="form-group">

              <label>Email</label>

              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
              />

            </div>

            <div className="form-group">

              <label>Password</label>

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
              />

            </div>

            <div className="form-group">

              <label>Select Role</label>

              <select
                value={selectedRole}
                onChange={(event) =>
                  setSelectedRole(event.target.value)
                }
              >

                <option value="Admin">
                  Admin
                </option>

                <option value="Base Commander">
                  Base Commander
                </option>

                <option value="Logistics Officer">
                  Logistics Officer
                </option>

              </select>

            </div>

            <button
              type="submit"
              className="primary-button"
            >
              Login
            </button>

          </form>

          <p className="login-note">
            Demo RBAC: choose a role to view its permissions.
          </p>

        </div>

      </div>
    );
  }

  // =========================
  // MAIN APPLICATION
  // =========================

  return (
    <div className="app-container">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="sidebar-logo">

          <div className="logo-icon">
            🛡️
          </div>

          <div>
            <h2>Military AMS</h2>
            <span>Asset Management</span>
          </div>

        </div>

        <nav className="navigation">

          {navigationItems
            .filter((item) =>
              allowedPages.includes(item.name)
            )
            .map((item) => (

              <button
                key={item.name}
                className={`nav-item ${
                  activePage === item.name
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setActivePage(item.name)
                }
              >

                {item.icon}

                <span>
                  {item.name}
                </span>

              </button>

            ))}

        </nav>

        <div className="sidebar-bottom">

          <div className="user-info">

            <div className="avatar">
              {email.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{userRole}</strong>

              <small>
                {email}
              </small>

              {userRole === "Base Commander" && (
                <small>
                  Base: {assignedBase}
                </small>
              )}

            </div>

          </div>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </aside>

      {/* MAIN CONTENT */}

      <main className="main-content">

        {/* HEADER */}

        <header className="top-header">

          <div>

            <h1>
              {activePage}
            </h1>

            <p>
              Manage and monitor military assets efficiently
            </p>

          </div>

          <div className="header-date">
            📅 {new Date().toLocaleDateString()}
          </div>

        </header>

        {/* =========================
            DASHBOARD
        ========================= */}

        {activePage === "Dashboard" && (
          <section className="page-section">

            <div className="filter-card">

              <div className="filter-group">

                <label>
                  Date
                </label>

                <input
                  type="date"
                  value={dashboardDate}
                  onChange={(event) =>
                    setDashboardDate(event.target.value)
                  }
                />

              </div>

              <div className="filter-group">

                <label>
                  Base
                </label>

                <select
                  value={effectiveDashboardBase}
                  disabled={userRole === "Base Commander"}
                  onChange={(event) =>
                    setDashboardBase(event.target.value)
                  }
                >

                  {userRole !== "Base Commander" && (
                    <option value="">
                      All Bases
                    </option>
                  )}

                  <option value="Bangalore">
                    Bangalore
                  </option>

                  <option value="Delhi">
                    Delhi
                  </option>

                  <option value="Mumbai">
                    Mumbai
                  </option>

                  <option value="Chennai">
                    Chennai
                  </option>

                </select>

                {userRole === "Base Commander" && (
                  <small>
                    Assigned Base: {assignedBase}
                  </small>
                )}

              </div>

              <div className="filter-group">

                <label>
                  Equipment Type
                </label>

                <select
                  value={dashboardType}
                  onChange={(event) =>
                    setDashboardType(event.target.value)
                  }
                >

                  <option value="">
                    All Types
                  </option>

                  <option value="Weapon">
                    Weapon
                  </option>

                  <option value="Vehicle">
                    Vehicle
                  </option>

                  <option value="Aircraft">
                    Aircraft
                  </option>

                  <option value="Communication">
                    Communication
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>

              <div className="filter-group">

                <label>
                  &nbsp;
                </label>

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => {
                    setDashboardDate("");
                    setDashboardType("");

                    if (userRole !== "Base Commander") {
                      setDashboardBase("");
                    }
                  }}
                >
                  Clear Filters
                </button>

              </div>

            </div>

            <div className="metrics-grid">

              <div className="metric-card">

                <div className="metric-icon">
                  📦
                </div>

                <div>
                  <span>
                    Opening Balance
                  </span>

                  <strong>
                    {openingBalance}
                  </strong>
                </div>

              </div>

              <div className="metric-card">

                <div className="metric-icon">
                  📈
                </div>

                <div>
                  <span>
                    Purchases
                  </span>

                  <strong>
                    {totalPurchased}
                  </strong>
                </div>

              </div>

              <div className="metric-card">

                <div className="metric-icon">
                  ➡️
                </div>

                <div>
                  <span>
                    Transfer In
                  </span>

                  <strong>
                    {transferIn}
                  </strong>
                </div>

              </div>

              <div className="metric-card">

                <div className="metric-icon">
                  ⬅️
                </div>

                <div>
                  <span>
                    Transfer Out
                  </span>

                  <strong>
                    {transferOut}
                  </strong>
                </div>

              </div>

              <div className="metric-card">

                <div className="metric-icon">
                  🔄
                </div>

                <div>
                  <span>
                    Net Movement
                  </span>

                  <strong>
                    {netMovement}
                  </strong>
                </div>

              </div>

              <div className="metric-card">

                <div className="metric-icon">
                  👤
                </div>

                <div>
                  <span>
                    Assigned
                  </span>

                  <strong>
                    {totalAssigned}
                  </strong>
                </div>

              </div>

              <div className="metric-card">

                <div className="metric-icon">
                  📉
                </div>

                <div>
                  <span>
                    Expended
                  </span>

                  <strong>
                    {totalExpended}
                  </strong>
                </div>

              </div>

              <div className="metric-card">

                <div className="metric-icon">
                  📊
                </div>

                <div>
                  <span>
                    Closing Balance
                  </span>

                  <strong>
                    {closingBalance}
                  </strong>
                </div>

              </div>

            </div>

            <div className="dashboard-grid">

              <div className="content-card">

                <div className="card-header">

                  <div>
                    <h2>
                      Recent Purchases
                    </h2>

                    <p>
                      Latest asset procurement records
                    </p>
                  </div>

                  {allowedPages.includes("Purchases") && (
                    <button
                      className="secondary-button"
                      onClick={() =>
                        setActivePage("Purchases")
                      }
                    >
                      View All
                    </button>
                  )}

                </div>

                {filteredPurchases.length === 0 ? (
                  <div className="empty-state">

                    <div>
                      📦
                    </div>

                    <p>
                      No purchases recorded for the selected filters.
                    </p>

                  </div>
                ) : (
                  <div className="table-container">

                    <table>

                      <thead>

                        <tr>
                          <th>
                            Equipment
                          </th>

                          <th>
                            Type
                          </th>

                          <th>
                            Quantity
                          </th>

                          <th>
                            Base
                          </th>

                          <th>
                            Date
                          </th>
                        </tr>

                      </thead>

                      <tbody>

                        {filteredPurchases
                          .slice(-5)
                          .reverse()
                          .map((purchase) => (

                            <tr key={purchase.id}>

                              <td>
                                <strong>
                                  {purchase.equipmentName}
                                </strong>
                              </td>

                              <td>
                                {purchase.equipmentType}
                              </td>

                              <td>
                                {purchase.quantity}
                              </td>

                              <td>
                                {purchase.baseName}
                              </td>

                              <td>
                                {purchase.purchaseDate}
                              </td>

                            </tr>

                          ))}

                      </tbody>

                    </table>

                  </div>
                )}

              </div>

              <div className="content-card">

                <div className="card-header">

                  <div>
                    <h2>
                      System Summary
                    </h2>

                    <p>
                      Current asset movement
                    </p>
                  </div>

                </div>

                <div className="summary-list">

                  <div className="summary-item">

                    <span>
                      Total Purchases
                    </span>

                    <strong>
                      {totalPurchased}
                    </strong>

                  </div>

                  <div className="summary-item">

                    <span>
                      Transfers In
                    </span>

                    <strong>
                      {transferIn}
                    </strong>

                  </div>

                  <div className="summary-item">

                    <span>
                      Transfers Out
                    </span>

                    <strong>
                      {transferOut}
                    </strong>

                  </div>

                  <div className="summary-item">

                    <span>
                      Assigned Assets
                    </span>

                    <strong>
                      {totalAssigned}
                    </strong>

                  </div>

                  <div className="summary-item">

                    <span>
                      Expended Assets
                    </span>

                    <strong>
                      {totalExpended}
                    </strong>

                  </div>

                  <div className="summary-item total">

                    <span>
                      Current Balance
                    </span>

                    <strong>
                      {closingBalance}
                    </strong>

                  </div>

                </div>

              </div>

            </div>

            <div style={{ marginTop: "20px" }}>

              <button
                type="button"
                className="secondary-button"
                onClick={() =>
                  setShowMovementDetails(true)
                }
              >
                View Net Movement Details
              </button>

            </div>

            {showMovementDetails && (
              <div
                style={{
                  position: "fixed",
                  inset: 0,
                  background: "rgba(0,0,0,0.45)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1000,
                  padding: "20px",
                }}
              >

                <div
                  className="content-card"
                  style={{
                    maxWidth: "500px",
                    width: "100%",
                  }}
                >

                  <div className="card-header">

                    <div>

                      <h2>
                        Net Movement Details
                      </h2>

                      <p>
                        Purchases + Transfer In - Transfer Out
                      </p>

                    </div>

                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() =>
                        setShowMovementDetails(false)
                      }
                    >
                      Close
                    </button>

                  </div>

                  <div className="summary-list">

                    <div className="summary-item">

                      <span>
                        Purchases
                      </span>

                      <strong>
                        {totalPurchased}
                      </strong>

                    </div>

                    <div className="summary-item">

                      <span>
                        Transfer In
                      </span>

                      <strong>
                        + {transferIn}
                      </strong>

                    </div>

                    <div className="summary-item">

                      <span>
                        Transfer Out
                      </span>

                      <strong>
                        - {transferOut}
                      </strong>

                    </div>

                    <div className="summary-item total">

                      <span>
                        Net Movement
                      </span>

                      <strong>
                        {netMovement}
                      </strong>

                    </div>

                  </div>

                </div>

              </div>
            )}

          </section>
        )}

        {/* =========================
            PURCHASES
        ========================= */}

        {activePage === "Purchases" &&
          allowedPages.includes("Purchases") && (
            <section className="page-section">

              <div className="content-card">

                <div className="card-header">

                  <div>
                    <h2>
                      Record Purchase
                    </h2>

                    <p>
                      Add newly purchased military assets
                    </p>
                  </div>

                </div>

                <form
                  className="form-grid"
                  onSubmit={handlePurchaseSubmit}
                >

                  <div className="form-group">

                    <label>
                      Equipment Name
                    </label>

                    <input
                      type="text"
                      name="equipmentName"
                      placeholder="e.g. Rifle"
                      value={purchaseForm.equipmentName}
                      onChange={handlePurchaseChange}
                    />

                  </div>

                  <div className="form-group">

                    <label>
                      Equipment Type
                    </label>

                    <select
                      name="equipmentType"
                      value={purchaseForm.equipmentType}
                      onChange={handlePurchaseChange}
                    >

                      <option value="">
                        Select Type
                      </option>

                      <option value="Weapon">
                        Weapon
                      </option>

                      <option value="Vehicle">
                        Vehicle
                      </option>

                      <option value="Aircraft">
                        Aircraft
                      </option>

                      <option value="Communication">
                        Communication
                      </option>

                      <option value="Other">
                        Other
                      </option>

                    </select>

                  </div>

                  <div className="form-group">

                    <label>
                      Quantity
                    </label>

                    <input
                      type="number"
                      min="1"
                      name="quantity"
                      placeholder="Enter quantity"
                      value={purchaseForm.quantity}
                      onChange={handlePurchaseChange}
                    />

                  </div>

                  <div className="form-group">

                    <label>
                      Base
                    </label>

                    <select
                      name="baseName"
                      value={purchaseForm.baseName}
                      onChange={handlePurchaseChange}
                    >

                      <option value="">
                        Select Base
                      </option>

                      <option value="Bangalore">
                        Bangalore
                      </option>

                      <option value="Delhi">
                        Delhi
                      </option>

                      <option value="Mumbai">
                        Mumbai
                      </option>

                      <option value="Chennai">
                        Chennai
                      </option>

                    </select>

                  </div>

                  <div className="form-group">

                    <label>
                      Purchase Date
                    </label>

                    <input
                      type="date"
                      name="purchaseDate"
                      value={purchaseForm.purchaseDate}
                      onChange={handlePurchaseChange}
                    />

                  </div>

                  <div className="form-actions">

                    <button
                      type="submit"
                      className="primary-button"
                    >
                      + Record Purchase
                    </button>

                  </div>

                </form>

              </div>

              <div className="content-card">

                <div className="card-header">

                  <div>

                    <h2>
                      Purchase History
                    </h2>

                    <p>
                      All recorded purchases
                    </p>

                  </div>

                  <span className="record-count">
                    {purchases.length} Records
                  </span>

                </div>

                {purchases.length === 0 ? (
                  <div className="empty-state">

                    <div>
                      📦
                    </div>

                    <p>
                      No purchase records available.
                    </p>

                  </div>
                ) : (
                  <div className="table-container">

                    <table>

                      <thead>

                        <tr>
                          <th>ID</th>
                          <th>Equipment</th>
                          <th>Type</th>
                          <th>Quantity</th>
                          <th>Base</th>
                          <th>Purchase Date</th>
                        </tr>

                      </thead>

                      <tbody>

                        {purchases.map((purchase) => (

                          <tr key={purchase.id}>

                            <td>
                              #{purchase.id}
                            </td>

                            <td>
                              <strong>
                                {purchase.equipmentName}
                              </strong>
                            </td>

                            <td>
                              {purchase.equipmentType}
                            </td>

                            <td>
                              {purchase.quantity}
                            </td>

                            <td>
                              {purchase.baseName}
                            </td>

                            <td>
                              {purchase.purchaseDate}
                            </td>

                          </tr>

                        ))}

                      </tbody>

                    </table>

                  </div>
                )}

              </div>

            </section>
          )}

        {/* =========================
            TRANSFERS
        ========================= */}

        {activePage === "Transfers" &&
          allowedPages.includes("Transfers") && (
            <section className="page-section">

              <div className="content-card">

                <div className="card-header">

                  <div>
                    <h2>
                      Transfer Asset
                    </h2>

                    <p>
                      Move assets between military bases
                    </p>
                  </div>

                </div>

                <form
                  className="form-grid"
                  onSubmit={handleTransferSubmit}
                >

                  <div className="form-group">

                    <label>
                      Equipment Name
                    </label>

                    <input
                      type="text"
                      name="equipmentName"
                      placeholder="e.g. Rifle"
                      value={transferForm.equipmentName}
                      onChange={handleTransferChange}
                    />

                  </div>

                  <div className="form-group">

                    <label>
                      Quantity
                    </label>

                    <input
                      type="number"
                      min="1"
                      name="quantity"
                      placeholder="Enter quantity"
                      value={transferForm.quantity}
                      onChange={handleTransferChange}
                    />

                  </div>

                  <div className="form-group">

                    <label>
                      From Base
                    </label>

                    <select
                      name="fromBase"
                      value={transferForm.fromBase}
                      onChange={handleTransferChange}
                    >

                      <option value="">
                        Select Base
                      </option>

                      <option value="Bangalore">
                        Bangalore
                      </option>

                      <option value="Delhi">
                        Delhi
                      </option>

                      <option value="Mumbai">
                        Mumbai
                      </option>

                      <option value="Chennai">
                        Chennai
                      </option>

                    </select>

                  </div>

                  <div className="form-group">

                    <label>
                      To Base
                    </label>

                    <select
                      name="toBase"
                      value={transferForm.toBase}
                      onChange={handleTransferChange}
                    >

                      <option value="">
                        Select Base
                      </option>

                      <option value="Bangalore">
                        Bangalore
                      </option>

                      <option value="Delhi">
                        Delhi
                      </option>

                      <option value="Mumbai">
                        Mumbai
                      </option>

                      <option value="Chennai">
                        Chennai
                      </option>

                    </select>

                  </div>

                  <div className="form-group">

                    <label>
                      Transfer Date
                    </label>

                    <input
                      type="date"
                      name="transferDate"
                      value={transferForm.transferDate}
                      onChange={handleTransferChange}
                    />

                  </div>

                  <div className="form-actions">

                    <button
                      type="submit"
                      className="primary-button"
                    >
                      🔄 Transfer Asset
                    </button>

                  </div>

                </form>

              </div>

              <div className="content-card">

                <div className="card-header">

                  <div>

                    <h2>
                      Transfer History
                    </h2>

                    <p>
                      Historical asset movements
                    </p>

                  </div>

                  <span className="record-count">
                    {transfers.length} Records
                  </span>

                </div>

                {transfers.length === 0 ? (
                  <div className="empty-state">

                    <div>
                      🔄
                    </div>

                    <p>
                      No transfer records available.
                    </p>

                  </div>
                ) : (
                  <div className="table-container">

                    <table>

                      <thead>

                        <tr>
                          <th>ID</th>
                          <th>Equipment</th>
                          <th>Quantity</th>
                          <th>From Base</th>
                          <th>To Base</th>
                          <th>Date</th>
                        </tr>

                      </thead>

                      <tbody>

                        {transfers.map((transfer) => (

                          <tr key={transfer.id}>

                            <td>
                              #{transfer.id}
                            </td>

                            <td>
                              <strong>
                                {transfer.equipmentName}
                              </strong>
                            </td>

                            <td>
                              {transfer.quantity}
                            </td>

                            <td>
                              {transfer.fromBase}
                            </td>

                            <td>
                              {transfer.toBase}
                            </td>

                            <td>
                              {transfer.transferDate}
                            </td>

                          </tr>

                        ))}

                      </tbody>

                    </table>

                  </div>
                )}

              </div>

            </section>
          )}

        {/* =========================
            ASSIGNMENTS
        ========================= */}

        {activePage === "Assignments" &&
          allowedPages.includes("Assignments") && (
            <section className="page-section">

              <div className="content-card">

                <div className="card-header">

                  <div>
                    <h2>
                      Assign Asset
                    </h2>

                    <p>
                      Assign military equipment to personnel
                    </p>
                  </div>

                </div>

                <form
                  className="form-grid"
                  onSubmit={handleAssignmentSubmit}
                >

                  <div className="form-group">

                    <label>
                      Equipment Name
                    </label>

                    <input
                      type="text"
                      name="equipmentName"
                      placeholder="e.g. Rifle"
                      value={assignmentForm.equipmentName}
                      onChange={handleAssignmentChange}
                    />

                  </div>

                  <div className="form-group">

                    <label>
                      Personnel Name
                    </label>

                    <input
                      type="text"
                      name="personnelName"
                      placeholder="e.g. John"
                      value={assignmentForm.personnelName}
                      onChange={handleAssignmentChange}
                    />

                  </div>

                  <div className="form-group">

                    <label>
                      Quantity
                    </label>

                    <input
                      type="number"
                      min="1"
                      name="quantity"
                      placeholder="Enter quantity"
                      value={assignmentForm.quantity}
                      onChange={handleAssignmentChange}
                    />

                  </div>

                  <div className="form-group">

                    <label>
                      Assigned Date
                    </label>

                    <input
                      type="date"
                      name="assignedDate"
                      value={assignmentForm.assignedDate}
                      onChange={handleAssignmentChange}
                    />

                  </div>

                  <div className="form-actions">

                    <button
                      type="submit"
                      className="primary-button"
                    >
                      👤 Assign Asset
                    </button>

                  </div>

                </form>

              </div>

              <div className="content-card">

                <div className="card-header">

                  <div>

                    <h2>
                      Assignment History
                    </h2>

                    <p>
                      Assets assigned to personnel
                    </p>

                  </div>

                  <span className="record-count">
                    {assignments.length} Records
                  </span>

                </div>

                {assignments.length === 0 ? (
                  <div className="empty-state">

                    <div>
                      👤
                    </div>

                    <p>
                      No assignment records available.
                    </p>

                  </div>
                ) : (
                  <div className="table-container">

                    <table>

                      <thead>

                        <tr>
                          <th>ID</th>
                          <th>Equipment</th>
                          <th>Personnel</th>
                          <th>Quantity</th>
                          <th>Assigned Date</th>
                        </tr>

                      </thead>

                      <tbody>

                        {assignments.map((assignment) => (

                          <tr key={assignment.id}>

                            <td>
                              #{assignment.id}
                            </td>

                            <td>
                              <strong>
                                {assignment.equipmentName}
                              </strong>
                            </td>

                            <td>
                              {assignment.personnelName}
                            </td>

                            <td>
                              {assignment.quantity}
                            </td>

                            <td>
                              {assignment.assignedDate}
                            </td>

                          </tr>

                        ))}

                      </tbody>

                    </table>

                  </div>
                )}

              </div>

            </section>
          )}

        {/* =========================
            EXPENDITURES
        ========================= */}

        {activePage === "Expenditures" &&
          allowedPages.includes("Expenditures") && (
            <section className="page-section">

              <div className="content-card">

                <div className="card-header">

                  <div>

                    <h2>
                      Record Expenditure
                    </h2>

                    <p>
                      Record assets that have been expended
                    </p>

                  </div>

                </div>

                <form
                  className="form-grid"
                  onSubmit={handleExpenditureSubmit}
                >

                  <div className="form-group">

                    <label>
                      Equipment Name
                    </label>

                    <input
                      type="text"
                      name="equipmentName"
                      placeholder="e.g. Rifle"
                      value={expenditureForm.equipmentName}
                      onChange={handleExpenditureChange}
                    />

                  </div>

                  <div className="form-group">

                    <label>
                      Quantity
                    </label>

                    <input
                      type="number"
                      min="1"
                      name="quantity"
                      placeholder="Enter quantity"
                      value={expenditureForm.quantity}
                      onChange={handleExpenditureChange}
                    />

                  </div>

                  <div className="form-group">

                    <label>
                      Expended Date
                    </label>

                    <input
                      type="date"
                      name="expendedDate"
                      value={expenditureForm.expendedDate}
                      onChange={handleExpenditureChange}
                    />

                  </div>

                  <div className="form-actions">

                    <button
                      type="submit"
                      className="primary-button"
                    >
                      📉 Record Expenditure
                    </button>

                  </div>

                </form>

              </div>

              <div className="content-card">

                <div className="card-header">

                  <div>

                    <h2>
                      Expenditure History
                    </h2>

                    <p>
                      Historical expenditure records
                    </p>

                  </div>

                  <span className="record-count">
                    {expenditures.length} Records
                  </span>

                </div>

                {expenditures.length === 0 ? (
                  <div className="empty-state">

                    <div>
                      📉
                    </div>

                    <p>
                      No expenditure records available.
                    </p>

                  </div>
                ) : (
                  <div className="table-container">

                    <table>

                      <thead>

                        <tr>
                          <th>ID</th>
                          <th>Equipment</th>
                          <th>Quantity</th>
                          <th>Expended Date</th>
                        </tr>

                      </thead>

                      <tbody>

                        {expenditures.map((expenditure) => (

                          <tr key={expenditure.id}>

                            <td>
                              #{expenditure.id}
                            </td>

                            <td>
                              <strong>
                                {expenditure.equipmentName}
                              </strong>
                            </td>

                            <td>
                              {expenditure.quantity}
                            </td>

                            <td>
                              {expenditure.expendedDate}
                            </td>

                          </tr>

                        ))}

                      </tbody>

                    </table>

                  </div>
                )}

              </div>

            </section>
          )}

      </main>

    </div>
  );
}

export default App;