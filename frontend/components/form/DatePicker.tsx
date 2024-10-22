import React, { useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { formatDateWithoutTimezone } from '../../utils/helpers';

interface DatePickerProps {
  label: string;
  value: string;
  onChangeDate: (date: Date) => void;
  error?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ label, value, onChangeDate, error }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const showDatePicker = useCallback(() => {
    setDatePickerVisibility(true);
  }, []);

  const hideDatePicker = useCallback(() => {
    setDatePickerVisibility(false);
  }, []);

  const handleConfirm = useCallback((date: Date) => {
    onChangeDate(date);
    hideDatePicker();
  }, [onChangeDate, hideDatePicker]);

  const formattedDate = useMemo(() => value ? formatDateWithoutTimezone(value) : 'Seleccione una fecha', [value]);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[styles.input, error ? styles.inputError : {}]}
        onPress={showDatePicker}
      >
        <Text>{formattedDate}</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default DatePicker;