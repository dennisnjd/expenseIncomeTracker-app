import { View, Text, Pressable, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import React, { memo } from 'react';
import { FontFamily } from '@constants/fonts';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

type ComponentProps = {
    date: Date | null;
    setDate: React.Dispatch<React.SetStateAction<Date | null>>;
    setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>;
    showDatePicker: boolean;

    showTimePicker?: boolean;
    isTime12Hours?: boolean;
};

const DatePicker = ({
    date,
    setDate,
    setShowDatePicker,
    showDatePicker,
    showTimePicker,
    isTime12Hours,
}: ComponentProps) => {
    const [selectedDate, setSelectedDate] = React.useState<DateType>(
        date?.toISOString() || new Date().toISOString(),
    );
    console.log('HAHAHA');
    const defaultStyles = useDefaultStyles();

    function onDateChange(date: DateType) {
        console.log('Selected date:', date);
        setSelectedDate(date);
    }

    function onConfirmDate() {
        setDate(new Date(selectedDate as string));
        setShowDatePicker(false);
    }

    return (
        showDatePicker && (
            <View style={{ position: 'absolute', backgroundColor: 'transparent', width, height }}>
                <Pressable style={styles.overlay} onPress={() => setShowDatePicker(false)} />

                <Animated.View
                    entering={SlideInDown}
                    exiting={SlideOutDown}
                    style={styles.DatePickerContainer}>
                    <DateTimePicker
                        timePicker={showTimePicker ? true : false}
                        use12Hours={isTime12Hours ? true : false}
                        mode="single"
                        date={selectedDate}
                        onChange={({ date }) => onDateChange(date)}
                        styles={{
                            ...defaultStyles,
                            today: styles.today, // Add a border to today's date
                            today_label: styles.todayLabel, // Change the label color of today's date
                            selected: styles.selected, // Highlight the selected day
                            selected_label: styles.selectedLabel, // Highlight the selected day label
                            month_label: styles.month_label, // Change the month label color
                            button_next_image: { tintColor: '#F7AD45' }, // Change the next button color
                            button_prev_image: { tintColor: '#F7AD45' }, // Change the previous button color
                        }}
                        style={{
                            alignSelf: 'center',
                            backgroundColor: 'white',
                            width: '100%',
                            paddingHorizontal: 10,
                        }}
                        navigationPosition="right"
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setShowDatePicker(false)}>
                            <Text style={styles.btnTxt}>CANCEL</Text>
                        </TouchableOpacity>

                        <View style={{ height: '100%', width: 0.7, backgroundColor: '#cccccc' }} />

                        <TouchableOpacity style={styles.button} onPress={onConfirmDate}>
                            <Text style={[styles.btnTxt, { color: '#F7AD45' }]}>CONFIRM</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        )
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject, // Cover the entire screen
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black color
    },

    DatePickerContainer: {
        position: 'absolute',
        bottom: '5%',
        paddingVertical: 10,
        borderRadius: 10,
        width: width * 0.95,
        backgroundColor: '#fff',
        alignSelf: 'center',
    },
    today: {
        backgroundColor: '#fff',
        borderRadius: 100,
        borderWidth: 1.4,
        borderColor: '#F7AD45',
    },
    todayLabel: { color: 'black', fontFamily: FontFamily.medium, fontSize: 15 }, // Change the label color of today's date
    selected: { backgroundColor: '#F7AD45' }, // Highlight the selected day
    selectedLabel: {
        color: '#fff',
        fontFamily: FontFamily.semiBold,
        fontSize: 15,
    },
    month_label: { fontFamily: FontFamily.medium, fontSize: 13 },

    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 0.7,
        borderColor: '#cccccc',
    },
    button: {
        width: '45%',
        alignItems: 'center',
        paddingVertical: 10,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    btnTxt: {
        fontSize: 15,
        fontFamily: FontFamily.medium,
        color: '#000',
        letterSpacing: 1.3,
    },
});

export default memo(DatePicker);
