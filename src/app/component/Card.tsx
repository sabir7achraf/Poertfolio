import styles from './card.module.css';

interface ProjectCardProps {
    title: string;
    description: string;
}

const ProjectCard = ({ title, description }: ProjectCardProps) => {
    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <h3 className={styles.heading}>{title}</h3>
                <p className={styles.para}>{description}</p>
            </div>
        </div>
    );
};

export default ProjectCard;