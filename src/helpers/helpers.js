import { NInput, NSelect, useNotification } from "naive-ui";
import { defineComponent, ref, h, nextTick } from "vue";
import { filterOptions } from "../data/data";

export function isContainOnlyNumbers(str) {
  return /^[0-9]$|^[1-9][0-9]$|^(100)$/.test(str);
}

export const formatDate = (a, b) => {
  if (a.startDate < b.startDate) {
    return 1;
  }
  if (a.startDate > b.startDate) {
    return -1;
  }
  return 0;
};

export function summary(pageData) {
  return {
    client: {
      value: h("div", {}, null, [
        h(
          "div",
          {},
          "Total revenue on page: ",
          h(
            "span",
            {
              style: "opacity: 0.9; color: #18a058;",
            },
            pageData.reduce((prevValue, row) => prevValue + row.revenue, 0)
          )
        ),
      ]),
      colSpan: 7,
    },
  };
}

export const statusHandler = defineComponent({
  props: {
    value: [String, Number],
    onUpdateValue: [Function, Array],
    img: [String],
  },
  setup(props) {
    const isEdit = ref(false);
    const inputRef = ref(null);
    const inputValue = ref(props.value);
    function handleOnClick() {
      isEdit.value = true;
      nextTick(() => {
        inputRef.value.focus();
      });
    }
    function handleChange() {
      props.onUpdateValue(inputValue.value);
      isEdit.value = false;
    }

    return () =>
      h(
        "div",
        {
          style: "display: flex; justify-content: space-between; gap: 5px",
          onClick: handleOnClick,
        },
        isEdit.value
          ? h(NSelect, {
              "show-checkmark": false,
              value: ref(props.value),
              options: filterOptions,
              ref: inputRef,
              onBlur: handleChange,
              onUpdateValue: (v) => {
                inputValue.value = v;
                handleChange();
              },
            })
          : props.value,
        h("img", {
          style: "width: 20px; height: 20px",
          src: props.img,
        })
      );
  },
});

export const percentHandler = defineComponent({
  props: {
    value: [String, Number],
    onUpdateValue: [Function, Array],
  },
  setup(props) {
    const isEdit = ref(false);
    const inputRef = ref(null);
    const inputValue = ref(props.value);
    const notification = useNotification();
    function handleOnClick() {
      isEdit.value = true;
      nextTick(() => {
        inputRef.value.focus();
      });
    }
    function handleChange() {
      props.onUpdateValue(inputValue.value);
      isEdit.value = false;
    }
    return () =>
      h(
        "div",
        {
          onClick: handleOnClick,
        },
        isEdit.value
          ? h(NInput, {
              value: ref(inputValue),
              ref: inputRef,
              onBlur: handleChange,
              onChange: handleChange,
              onUpdateValue: (v) => {
                isContainOnlyNumbers(v)
                  ? (inputValue.value = v)
                  : notification.warning({
                      title: "Oops!",
                      content: "You can enter only percents from 0 to 100",
                      duration: 2000,
                    });
              },
            })
          : props.value
      );
  },
});
