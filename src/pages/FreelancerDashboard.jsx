import { useAuth } from "../contexts/AuthContext";
import Dashboard from "../components/Dashboard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../stylesheets/ClientDashboard.css";
import job from "../assets/images/jobs.png";
import con from "../assets/images/contracts.png";
import pay from "../assets/images/payments.png";
import stat from "../assets/images/quickstats.png";

const categories = [
  { id: 1, name: "Jobs",               path: "/freelancer-jobs",        image: job  },
  { id: 2, name: "Contracts & Tasks",  path: "/con-tasks-clients",  image: con  },
  { id: 3, name: "Payments",           path: "/client-payments",    image: pay  },
  { id: 4, name: "Quick Stats",        path: "/q-stats",            image: stat },
];

export default function FreelancerDashboard() {
  const { displayName } = useAuth();

  return (
    <>
      <Header />
      <main className="client-main">
        <section className="categories">
          <header className="categories__heading">
            <h1 className="categories__title">
              Welcome back, {displayName} 👋
            </h1>
            <p className="categories__subtitle">
              What would you like to manage today?
            </p>
          </header>

          <Dashboard categories={categories} />

          <Footer />
        </section>
      </main>
    </>
  );
}
