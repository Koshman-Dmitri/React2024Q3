import styles from './PasswordStrength.module.css';

function PasswordStrength({ password }: { password: string }) {
  const requirements = [
    { condition: /[0-9]/.test(password) },
    { condition: /[a-z]/.test(password) },
    { condition: /[A-Z]/.test(password) },
    { condition: /[!?@#$%^&*]/.test(password) },
  ];

  let doneRequirements;
  if (typeof password === 'undefined') doneRequirements = 0;
  else doneRequirements = requirements.filter((r) => r.condition === true).length;

  return (
    <div className={styles.wrapper}>
      <div className={doneRequirements > 0 ? styles.fill : styles.empty} />
      <div className={doneRequirements > 1 ? styles.fill : styles.empty} />
      <div className={doneRequirements > 2 ? styles.fill : styles.empty} />
      <div className={doneRequirements > 3 ? styles.fill : styles.empty} />
    </div>
  );
}

export default PasswordStrength;
