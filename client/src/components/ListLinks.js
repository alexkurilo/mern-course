import React from 'react';
import {Link} from 'react-router-dom';

export const ListLinks = ({ links }) => {
    if (links.length === 0) {
        return (
            <h4 className="center">
                <p>
                    Not links
                </p>
            </h4>
        );
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Origin link</th>
                    <th>Shorted link</th>
                    <th>Open link</th>
                </tr>
            </thead>

            <tbody>
            {links.map( (link, index) => {
                return (
                    <tr key={link._id}>
                        <td>{index + 1}</td>
                        <td className="td_link">{link.from}</td>
                        <td>{link.to}</td>
                        <td>
                            <Link to={`/detail/${link._id}`}>Open</Link>
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
};