import * as React from 'react';

import TabsUnstyled from '@mui/base/TabsUnstyled';
import { TabsList } from './components/TabsList';
import { Tab } from './components/Tab';
import { TabPanel } from './components/TabPanel';

import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../store/reducers';
import { transitCargoType } from '../../store/reducers/transits-reducer/types';
import { cargoType } from '../../store/reducers/cargos-reducer/types';

const StatisticPage = () => {
    const cargos = useSelector<AppRootStateType, cargoType[]>(
        (state) => state.cargos
    );

    const transitCargos = useSelector<AppRootStateType, transitCargoType[]>(
        (state) => state.transitCargo
    );
    const completedTransits = transitCargos.filter(
        (item) => item.status === 'Completed'
    );
    const inTransit = transitCargos.filter(
        (item) => item.status === 'In transit'
    );
    const stockCargos = cargos.filter((item) => item.status === 'In stock');

    return (
        <div className={styles.main}>
            <div className={styles.heroBg} />
            <div className={styles.flexContainer}>
                <h1 className={styles.title}>Statistics history</h1>
                <TabsUnstyled defaultValue={0}>
                    <TabsList>
                        <Tab className={styles.tab}>In stock</Tab>
                        <Tab className={styles.tab}>In transit</Tab>
                        <Tab className={styles.tab}>Completed</Tab>
                    </TabsList>
                    <TabPanel value={0}>
                        <>
                            <h2>In stock</h2>
                            {stockCargos.map((item) => (
                                <div key={item.id}>
                                    <span>
                                        {item.name || 'No stock cargos'}
                                    </span>
                                </div>
                            ))}
                            <span>Total: </span>
                            <span>{stockCargos.length}</span>
                        </>
                    </TabPanel>
                    <TabPanel value={1}>
                        <h2>In transit</h2>
                        {inTransit.map((item) => (
                            <div key={item.id}>
                                <span>{item.name || 'No in transits'}</span>
                            </div>
                        ))}
                        <span>Total: </span>
                        <span>{inTransit.length}</span>
                    </TabPanel>
                    <TabPanel value={2}>
                        <h2>Completed</h2>
                        {completedTransits.map((item) => (
                            <div key={item.id}>
                                <span>{item.name || 'No completed'}</span>
                            </div>
                        ))}

                        <span>Total: </span>
                        <span>{completedTransits.length}</span>
                    </TabPanel>
                </TabsUnstyled>
            </div>
        </div>
    );
};

export default StatisticPage;
