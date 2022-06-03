import React from 'react';

const PatientDetails = (props) => {
    return <table>
        <tbody>
            <tr>
                <td>Id</td>
                <td>{props.patientObj.healthId}</td>
            </tr>
            <tr>
                <td>Name</td>
                <td>{props.patientObj.name}</td>
            </tr>
            <tr>
                <td>Last tested on</td>
                <td>{props.patientObj.lastTestedOn === '' ? 'NA' : props.patientObj.lastTestedOn}</td>
            </tr>
        </tbody>
    </table>;
}

export default PatientDetails;