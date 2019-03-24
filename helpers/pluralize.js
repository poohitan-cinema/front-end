export default function describeWordCount(count, [one, twoToFour, rest]) {
  if (!count) {
    return `Немає ${rest}`;
  }

  if (count === 1) {
    return `Один ${one}`;
  }

  const lastTwoDigits = count > 9 ? count % 100 : null;
  const lastDigit = count % 10;

  if (lastTwoDigits >= 10 && lastTwoDigits <= 20) {
    return `${count} ${rest}`;
  }

  if (lastDigit === 1) {
    return `${count} ${one}`;
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} ${twoToFour}`;
  }

  return `${count} ${rest}`;
}
