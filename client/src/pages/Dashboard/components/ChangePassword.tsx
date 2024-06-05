import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

interface ChangePasswordProps {
  header: string;
  description: string;
  confirmContent: string;
  handleConfirm: (newPassword: string) => void;
  handleClose: () => void;
  popup: boolean;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({
  header,
  description,
  confirmContent,
  handleConfirm,
  handleClose,
  popup,
}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    handleConfirm(password);
  };

  return (
    <AnimatePresence>
      {popup && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="fixed left-[34%] top-[34%] z-50 flex justify-center items-center">
            <div className="w-[500px] border border-neutral-800 rounded-md bg-neutral-50 box-border p-10 dark:bg-neutral-950 dark:border-white dark:border-opacity-10 flex flex-col gap-10 justify-between">
              <div className="w-full flex flex-col gap-1">
                <h1 className="text-2xl font-normal dark:text-white">
                  {header}
                </h1>
                <p className="text-neutral-500 font-light">{description}</p>

                <label htmlFor="" className="font-light text-sm mb-1 mt-3">
                  New password
                </label>
                <input
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2 text-neutral-100 text-sm font-light rounded-lg h-[40px] bg-neutral-800 border border-neutral-700 focus:outline-none focus:border-2 focus:border-neutral-600 placeholder:opacity-50"
                />

                <label htmlFor="" className="font-light text-sm mb-1 mt-3">
                  Confirm new password
                </label>
                <input
                  id="confirmPassword"
                  placeholder="••••••••"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="p-2 text-neutral-100 text-sm font-light rounded-lg h-[40px] bg-neutral-800 border border-neutral-700 focus:outline-none focus:border-2 focus:border-neutral-600 placeholder:opacity-50"
                />
              </div>
              <div className="w-full flex justify-end gap-2">
                <button
                  onClick={handleChangePassword}
                  className="w-full h-[40px] rounded-lg border border-neutral-800 bg-neutral-900 pl-4 text-sm text-neutral-300 transition hover:brightness-105"
                >
                  {confirmContent}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChangePassword;
