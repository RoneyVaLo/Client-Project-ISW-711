import { useState } from 'react';

const LabelGenerator = ({ addLable, pLabelList }) => {
    const [label, setLabel] = useState('');
    const [labelList, setLabelList] = useState((pLabelList.length > 0) ? pLabelList : []);

    const handleChange = (event) => {
        setLabel(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (label.trim() !== '') {
            addLable([...labelList, label]);
            setLabelList([...labelList, label]);
            setLabel('');
        }
    };

    const handleDeleteLabel = (e, pLabel) => {
        e.preventDefault();
        const updatedLabelList = labelList.filter(label => label !== pLabel);
        addLable(updatedLabelList);
        setLabelList(updatedLabelList);
    };

    return (
        <div>
            <div>
                <input type="text" value={label} onChange={handleChange} />
                <button type="submit" onClick={handleSubmit}>Add label</button>
            </div>
            <div className="rows-labels">
                {labelList.map((label, index) => (
                    <div key={index}>
                        {label}
                        <button onClick={(e) => handleDeleteLabel(e, label)}>X</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LabelGenerator;
