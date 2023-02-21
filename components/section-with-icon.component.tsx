
interface SectionWithIconProps {
    icon: JSX.Element;
    title: string;
    texts: string[];
}

export const SectionWithIcon = ({ icon, texts, title }: SectionWithIconProps): JSX.Element => {
    return (
        <div>
            <div className='flex flex-col justify-center items-center mb-5'>
            {icon}
            <h2>{title}</h2>
            </div>

            <div className='space-y-2'>
                {texts.map((text) => (
                     <p key={text} className='sectionInfoText'>{text}</p>
                ))}
            </div>
      </div>
    )
}