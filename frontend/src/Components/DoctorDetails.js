import React from 'react';

const DoctorDetails = (props) => {
    return <table>
        <tbody>
            <tr>
                <td>Id</td>
                <td>{props.doctorObj.doctorId}</td>
            </tr>
            <tr>
                <td>Name</td>
                <td>{props.doctorObj.name}</td>
            </tr>
            <tr>
                <td>Availability</td>
                <td>{props.doctorObj.available}</td>
            </tr>
        </tbody>
    </table>;
}

export default DoctorDetails;