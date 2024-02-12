import "./style.css"

const AttackMomentum = () => {
    return (
        <div className="Momentum">
            <iframe
                title="Attack Momentum"
                width="100%"
                height="194"
                src="https://widgets.sofascore.com/embed/attackMomentum?id=11352453&widgetBackground=Gray&v=2"
                style={{ border: 'none', overflow: 'hidden' }}
                allowFullScreen
            ></iframe>
            <div style={{ fontSize: '12px', fontFamily: 'Arial, sans-serif' }}>
            </div>
        </div>
    );
};

export default AttackMomentum;
