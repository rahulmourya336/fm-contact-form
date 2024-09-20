import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

enum RT {
  generalEnquiry = "ge",
  supportRequest = "sr",
}

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  condition: string;
  queryType: RT;
}

const regex = {
  email:
    /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi,
};

function App() {
  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = () => {
    setConfirmationModal(true);
    reset();
    setTimeout(() => {
      setConfirmationModal(false);
    }, 3000);
  };

  return (
    <>
      <div className="container">
        {confirmationModal && (
          <div className="modal">
            <div className="heading">
              <img
                src={"images/icon-success-check.svg"}
                alt="check icon"
              />
              <p>Message Sent</p>
            </div>
            <div className="sub-text">
              Thanks for completing the form. We’ll be in touch soon!
            </div>
          </div>
        )}

        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form">
            <div className="grid-col-2">
              <div>
                <label htmlFor="first name">First Name</label>
                <input
                  type="text"
                  id="first name"
                  maxLength={32}
                  autoComplete="off"
                  {...register("firstName", { required: true })}
                />
                {errors.firstName && (
                  <span className="error-text">This field is required</span>
                )}
              </div>
              <div>
                <label htmlFor="last name">Last Name</label>
                <input
                  type="text"
                  id="last name"
                  maxLength={32}
                  autoComplete="off"
                  {...register("lastName", { required: true })}
                />
                {errors.lastName && (
                  <span className="error-text">This field is required</span>
                )}
              </div>
            </div>
            <div className="grid-col-1">
              <label htmlFor="first name">Email Address</label>
              <input
                type="text"
                id="email"
                maxLength={32}
                autoComplete="off"
                {...register("email", {
                  required: true,
                  pattern: regex.email,
                })}
              />
              {errors.email && (
                <span className="error-text">
                  Please enter a valid email address
                </span>
              )}
            </div>
            <div>
              <div>
                <label htmlFor="queryType">Query Type </label>
              </div>
              <div className="grid-col-2">
                <div
                  className={`border inline height-51 cursor-pointer ${
                    getValues("queryType") === RT.generalEnquiry
                      ? "selected"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    id="queryType"
                    value={RT.generalEnquiry}
                    {...register("queryType", { required: true })}
                  />
                  <label htmlFor="queryType" className="radio-label no-star">
                    General Enquiry
                  </label>
                </div>
                <div
                  className={`border inline height-51 cursor-pointer ${
                    getValues("queryType") === RT.supportRequest
                      ? "selected"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    id="supportRequest"
                    value={RT.supportRequest}
                    {...register("queryType", { required: true })}
                  />
                  <label
                    htmlFor="supportRequest"
                    className="radio-label no-star"
                  >
                    Support Request
                  </label>
                </div>
                {errors.queryType && (
                  <span className="error-text">This field is required</span>
                )}
              </div>
            </div>
            <div className="grid-col-1">
              <label htmlFor="Message">Message </label>
              <textarea
                id="message"
                rows={5}
                {...register("message", { required: true })}
              ></textarea>
              {errors.message && (
                <span className="error-text">This field is required</span>
              )}
            </div>
          </div>
          <div className="condition">
            <div className="tnc">
              <input
                type="checkbox"
                id="tnc"
                {...register("condition", { required: true })}
              />
              <label htmlFor="tnc" className="inline ml-4">
                I consent to being contacted by the team
              </label>{" "}
            </div>
            {errors.condition && (
              <span className="error-text block">
                To submit this form, please consent to being contacted
              </span>
            )}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default App;
