// File: client/src/components/innerOrbit/pageComponents/login/IOTerms.tsx

// React
import React from "react";
import { useNavigate } from "react-router-dom";

// Components
import TransparentStars from '../../common/TransparentStars';
import ShootingStar from '../../common/ShootingStar';

// Styles
import styles from '../../../../assets/css/innerOrbit/pageStyles/login/IOTerms.module.css';
import buttonStyles from '../../../../assets/css/innerOrbit/common/IOButton.module.css';
import logoStyles from '../../../../assets/css/innerOrbit/common/IOLogo.module.css';



const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.background}>
      <TransparentStars /> 
      <ShootingStar /> 
      <div className={styles.container}>
        <h1 className={logoStyles.title}>
          <span className={logoStyles.titleInner}>inner</span>
          <span className={logoStyles.titleOrbit}>Orbit</span>
        </h1>
        <h2>Terms of Service</h2>

        <p>
          Welcome to <strong>innerOrbit</strong>! These Terms of Service (the
          "Terms") govern your use of our website and services. By accessing or
          using our service, you agree to comply with these Terms. If you do not
          agree with any part of these Terms, please do not use our services.
        </p>

        <h3>1. Eligibility</h3>
        <p>
          You must be at least 16 years old to use the app. If you're under 18,
          you must have a parent or guardian’s permission.
        </p>

        <h3>2. User Accounts</h3>
        <p>
          When you create an account with us, you must provide accurate
          information. You are responsible for safeguarding your account and for
          all activities under your account. Please see our{" "}
          <a href="/privacy">Privacy Policy</a> for information on how we handle
          your personal data.
        </p>

        <h3>3. Mental Health Disclaimer</h3>
        <p>
          Our app provides tools for reflection and mindfulness. It does not
          offer medical advice or replace professional care. If you’re in
          crisis, seek help from a licensed provider or emergency services.
        </p>

        <h3>4. Termination of Service</h3>
        <p>
          We reserve the right to suspend or terminate your access if you
          violate these Terms or engage in unlawful behavior. We may also
          terminate the service with prior notice if necessary. Upon
          termination, your right to use the service will cease immediately.
        </p>

        <h3>5. User Conduct</h3>
        <p>
          You agree not to misuse the app, share harmful content, or violate laws.
        </p>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate(-1)}
            className={`${buttonStyles.button} ${buttonStyles.quinary}`}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Terms;
